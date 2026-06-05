import { drizzle } from "drizzle-orm/node-postgres";
import logger from "../utils/logger";
import { Pool } from "pg";
import ENV from "./env";
//import * as schema from "../db";

const connectDB = async () => {
    // Check if db url exists
    if (!ENV.DB_URL) {
        throw new Error("Database URL is not defined in environment variables.");
    }

    // Initialize postgre connection pool
    const pool = new Pool({ connectionString: ENV.DB_URL });
    pool.on("error", (err) => {
        logger.error("Database pool error:", {
            message: err?.message,
            stack: err?.stack,
        });
    });

    try {
        // Make a test connection so the 'connect' event is emitted and we can log success.
        const client = await pool.connect();
        try {
            logger.info("Connected to the database successfully.");
        } finally {
            client.release();
        }
    } catch (err: any) {
        logger.error("Database connection error:", {
            message: err?.message,
            stack: err?.stack,
        });
        // rethrow so caller can handle shutdown
        throw err;
    }

    return drizzle({ client: pool, /*schema*/ });
};

export default connectDB;
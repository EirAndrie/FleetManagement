import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import ENV from "./env";
import * as schema from "../db";

export const pool = new Pool({
  connectionString: ENV.DB_URL,
});

export const db = drizzle({
  client: pool,
  schema,
});

export const connectDB = async () => {
  await pool.query("SELECT 1");
};
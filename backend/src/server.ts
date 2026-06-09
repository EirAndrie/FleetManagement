import ENV from "./config/env";
import express from "express";
import path from "path";
import cors from "cors";
// File Imports to be added
import logger from "./utils/logger";
import { connectDB } from "./config/connectDB";

const app = express();
const PORT = ENV.PORT;
// Check if port exists
if (!PORT) {
    logger.info("Error: PORT is not defined in environment variables.");
    process.exit(1); // Terminate program if PORT is not defined
}

// Check if Frontend Origin exists
if (!ENV.FR_ORIGIN) {
    logger.info("Error: FR_ORIGIN is not defined in environment variables.");
    process.exit(1); // Terminate program if FR_ORIGIN is not defined
}

// --- MIDDLEWARE ---
const isProduction = ENV.NODE_ENV === "production";
logger.info(`MODE: ${isProduction ? "Production" : "Development"}`);
app.use(express.json());

// Run this if not production
if (!isProduction) {
  app.use(
    cors({
      origin: ENV.FR_ORIGIN,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    }),
  );
  logger.info(`CORS: ${ENV.FR_ORIGIN} Running in Development Mode`);
  // Run this if production
} else {
  app.use(
    cors({
      origin: ENV.FR_ORIGIN,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    }),
  );
  logger.info(`CORS: ${ENV.FR_ORIGIN} Running in Production Mode`);
}

// ROUTES SECTION: To be Added

// Check if project runs on production or development
if (isProduction) {
  const frontendPath = path.join(__dirname, "../frontend");
  app.use(express.static(frontendPath));

  // SPA callback for all non-API Routes
  app.get(/.*/, (req, res) => {
    // Only serve index.html for GET requests that don't match static files or API routes
    if (!req.url.startsWith("/api")) {
      res.sendFile(path.join(frontendPath, "index.html"));
    } else {
      res.status(404).json({ message: "API endpoint not found" });
    }
  });
} else {
  logger.info("App running in Development mode");
  app.get("/", (req, res) => {
    res.send("API running successfully...");
  });
}

// Server Start and db to be added
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  }).catch((err) => {
    logger.error("Failed to connect to the database:", {
      message: err.message,
      stack: err.stack,
    });
    process.exit(1); // Terminate program if database connection fails
  });

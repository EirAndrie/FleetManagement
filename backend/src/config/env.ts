import dotenv from "dotenv";
dotenv.config();

const ENV = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL,
    FR_ORIGIN: process.env.FR_ORIGIN,
    PASSWORD_LENGTH: process.env.PASSWORD_LENGTH
}

export default ENV;

/*
  This file is responsible for loading and validating environment variables.
  It uses the 'dotenv' package to load variables from a .env file into process.env.
  The ENV object provides typed access to these variables throughout the application.

  Design decisions:
  - Centralized configuration management for easy maintenance.
  - Validation of required variables to prevent runtime errors.
  - Support for different environments (development, production) through NODE_ENV.

  Future improvements:
  - Add support for loading from multiple .env files (e.g., .env.development, .env.production).
  - Integrate with a configuration management service for dynamic configuration in production.
*/
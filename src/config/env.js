/* eslint-env node */
import dotenv from "dotenv";

// Load .env into process.env
dotenv.config();

// Centralized environment configuration with sensible defaults
export const PORT = Number(process.env.PORT) || 3000;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/web-teacher";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

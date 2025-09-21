import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const swaggerPath = path.resolve(process.cwd(), "src", "config", "swagger.json");

export default function createSwaggerMiddleware() {
    const router = express.Router();

    let spec = null;
    try {
        const raw = fs.readFileSync(swaggerPath, "utf8");
        spec = JSON.parse(raw);
    } catch (err) {
        console.error("Failed to load swagger.json:", err);
        spec = null;
    }

    // If spec is null we'll still mount the UI; swagger-ui-express can show an error
    // if the document is invalid. Use an empty object as fallback.
    const doc = spec || {};
    router.use(swaggerUi.serve, swaggerUi.setup(doc));

    return router;
}

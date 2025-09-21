/* eslint-env node */
import fs from "fs";
import path from "path";

const swaggerPath = path.resolve(process.cwd(), "src", "config", "swagger.json");

export default function getSwagger(req, res, next) {
    try {
        const raw = fs.readFileSync(swaggerPath, "utf8");
        const doc = JSON.parse(raw);
        res.json(doc);
    } catch (err) {
        next(err);
    }
}

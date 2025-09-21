/* eslint-env node */
import app from "./app.js";
import connectDB from "./config/db.config.js";
import { PORT, MONGO_URI } from "./config/env.js";

async function start() {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server", err);
        process.exit(1);
    }
}

start();

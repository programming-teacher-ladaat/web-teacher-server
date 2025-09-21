import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.config.js";

const PORT = process.env.PORT || 3000;

connectDB();
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

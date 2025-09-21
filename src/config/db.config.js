import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

/**
 * Connect to MongoDB using the centralized env values.
 */
async function connectDB() {
    try {
        // silence Mongoose deprecation about strictQuery changing in v7
        mongoose.set("strictQuery", false);
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error", err);
        throw err;
    }
}

export default connectDB;

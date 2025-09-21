import mongoose from "mongoose";

/**
 * Connect to MongoDB.
 * @param {string} mongoUri - MongoDB connection string
 */
async function connectDB() {
    try {
        const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/web-teacher";
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error", err);
        throw err;
    }
}

export default connectDB;

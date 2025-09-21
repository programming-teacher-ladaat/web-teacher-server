import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        role: String,
        // store references to Course documents
        courses: { type: [mongoose.Schema.Types.ObjectId], ref: "Course" },
    },
    { timestamps: true }
);

// Export only the model (default export)
export default mongoose.model("User", UserSchema);

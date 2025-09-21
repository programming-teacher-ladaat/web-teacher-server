import { model, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        role: String,
        // store references to Course documents
        courses: { type: [Schema.Types.ObjectId], ref: "Course" },
    },
    { timestamps: true }
);

// Export only the model (default export)
export default model("User", UserSchema);

import mongoose from "mongoose";

const { Schema } = mongoose;

const GroupSchema = new Schema(
    {
        name: String,
        // references to Course documents
        courses: { type: [mongoose.Schema.Types.ObjectId], ref: "Course" },
        // references to User documents (students)
        students: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
        createdDate: Date,
    },
    { timestamps: true }
);

export default mongoose.model("Group", GroupSchema);

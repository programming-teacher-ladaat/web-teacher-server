import mongoose from "mongoose";

const { Schema } = mongoose;

const GroupSchema = new Schema(
    {
        name: { type: String, required: true },
        // references to Course documents
        courses: { type: [mongoose.Schema.Types.ObjectId], ref: "Course", default: [] },
        // references to User documents (students)
        students: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
        createdDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model("Group", GroupSchema);

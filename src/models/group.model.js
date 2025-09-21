import { model, Schema } from "mongoose";

const GroupSchema = new Schema(
    {
        name: String,
        // references to Course documents
        courses: { type: [Schema.Types.ObjectId], ref: "Course" },
        // references to User documents (students)
        students: { type: [Schema.Types.ObjectId], ref: "User" },
    },
    { timestamps: true }
);

export default model("Group", GroupSchema);

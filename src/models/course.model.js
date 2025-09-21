import mongoose from "mongoose";
const { Schema } = mongoose;

const LinkSchema = new Schema({
    name: String,
    url: String,
});

const SubmissionSchema = new Schema({
    filename: String,
    originalName: String,
    uploadedAt: { type: Date, default: Date.now },
});

const LessonSchema = new Schema({
    topic: String,
    date: Date,
    flow: [String],
    submissions: [SubmissionSchema],
    hidden: Boolean,
});

const CourseSchema = new Schema(
    {
    name: String,
    image: String,
    startDate: Date,
    // reference to a Group document instead of embedded object
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    links: [LinkSchema],
    files: [String],
    lessons: [LessonSchema],
    hidden: Boolean,
    },
    { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);

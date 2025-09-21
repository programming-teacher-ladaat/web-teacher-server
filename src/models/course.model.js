import mongoose from 'mongoose';
const { Schema } = mongoose;

const LinkSchema = new Schema({
  name: { type: String },
  url: { type: String, required: true },
});

const SubmissionSchema = new Schema({
  filename: { type: String },
  originalName: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

const LessonSchema = new Schema({
  topic: { type: String },
  date: { type: Date },
  flow: { type: [String], default: [] },
  submissions: { type: [SubmissionSchema], default: [] },
  hidden: { type: Boolean, default: false },
});

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    startDate: { type: Date, required: true },
  // reference to a Group document instead of embedded object
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    links: { type: [LinkSchema], default: [] },
    files: { type: [String], default: [] },
    lessons: { type: [LessonSchema], default: [] },
    hidden: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Course', CourseSchema);

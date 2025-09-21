import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: '12345678' },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    // store references to Course documents
    courses: { type: [mongoose.Schema.Types.ObjectId], ref: 'Course', default: [] },
  },
  { timestamps: true }
);

// Export only the model (default export)
export default mongoose.model('User', UserSchema);

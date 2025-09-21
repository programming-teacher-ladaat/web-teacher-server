import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

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

// Hash password before saving when it's new or modified
UserSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        if (!this.password) return next();
        const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
        this.password = hash;
        return next();
    } catch (err) {
        return next(err);
    }
});

// Instance method to compare plaintext password with hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Export only the model (default export)
export default model("User", UserSchema);

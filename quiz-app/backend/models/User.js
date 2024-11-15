import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: String,
    otp: Date,
    verificationToken: String,
    verificationExpiresAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

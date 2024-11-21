import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      default: "student",
    },
    resume: {
      type: String,
      default: null,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    socialLinks: {
      linkedin: { type: String, default: null },
      github: { type: String, default: null },
    },
    contactNumber: { type: String, default: null },
    address: { type: String, default: null },
    bio: {
      type: String,
      maxlength: 300,
      default: null,
    },
    skills: { type: [String], default: [] },
    appliedJobs: [
      {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        appliedAt: { type: Date, default: Date.now },
      },
    ],
    verificationToken: String,
    verificationExpiresAt: Date,
    isVerified: { type: Boolean, default: false },
    forgotPasswordToken: String, // Added for password reset
    forgotPasswordExpiresAt: Date, // Added for password reset
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt
  }
);

const User = mongoose.model("User", userSchema);
export default User;

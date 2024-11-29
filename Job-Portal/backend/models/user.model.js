import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
      default: "",
    },
    socialLinks: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
    },
    contactNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    bio: {
      type: String,
      maxlength: 300,
      default: "",
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
    forgotPasswordToken: String,
    forgotPasswordTokenExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    delete ret.verificationToken;
    delete ret.forgotPasswordToken;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.verificationExpiresAt;
    delete ret.forgotPasswordTokenExpiresAt;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);
export default User;

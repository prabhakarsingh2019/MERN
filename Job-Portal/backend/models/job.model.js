import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "freelance"],
      required: true,
    },
    jobFeild: {
      type: String,
      enum: [
        "Web Developer",
        "Python Developer",
        "Cloud Engineer",
        "Data Scientist",
        "Frontend Developer",
        "Backend Developer",
        "Fullstack Developer",
        "DevOps Engineer",
        "Mobile Developer",
        "Product Manager",
        "UI/UX Designer",
        "Project Manager",
        "Machine Learning Engineer",
      ],
      required: true,
    },

    requirements: {
      type: [String],
      default: [],
    },
    salaryRange: {
      type: String,
      default: null,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);

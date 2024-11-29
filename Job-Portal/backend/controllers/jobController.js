import User from "../models/user.model.js";
import Job from "../models/job.model.js";
import joi from "joi";

const jobDataSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  location: joi.string().required(),
  salaryRange: joi.string().required(),
  jobType: joi
    .string()
    .valid("full-time", "part-time", "internship", "freelance")
    .required(),
  requirements: joi.array().items(joi.string()).required(),
  companyName: joi.string().required(),
  jobRole: joi.string().required(),
  status: joi.string().valid("open", "close"),
});

export const createJob = async (req, res) => {
  const userId = req.user._id;
  const {
    title,
    description,
    companyName,
    location,
    jobType,
    jobRole,
    requirements,
    salaryRange,
    status,
  } = req.body;
  const { error } = jobDataSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: `Validation error: ${error.details[0].message}`,
      success: false,
    });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const job = new Job({
      title,
      description,
      companyName,
      location,
      jobType,
      jobRole,
      requirements,
      salaryRange,
      status,
      recruiter: userId,
      postedAt: Date.now(),
    });
    await job.save();
    res.status(201).json({
      message: "Job created successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const findJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate(
      "recruiter",
      "fullName username email profilePicture"
    );
    res.status(200).json({
      message: "Jobs found successfully",
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const findJobsById = async (req, res) => {
  const { filterData } = req.body;
  try {
    // const query = {};
    // query[filterType] = filterData;
    const jobs = await Job.find(filterData);
    if (!jobs) {
      return res.status(404).json({
        message: "no job found",
      });
    }
    res.status(200).json({
      message: "Job found successfully",
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

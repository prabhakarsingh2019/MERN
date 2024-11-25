import express from "express";
import { userAuthenticate } from "../middleware/userAuthenticate.js";
import {
  createJob,
  findJobs,
  findJobsById,
} from "../controllers/jobController.js";

const router = express.Router();
router.post("/create-job", userAuthenticate, createJob);
router.get("/", findJobs);
router.get("/:id", findJobsById);
export default router;

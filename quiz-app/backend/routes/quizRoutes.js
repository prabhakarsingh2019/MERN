import express from "express";
import { authenticateUser } from "../middleware/userAuthenticate.js";
import { createQuiz } from "../controllers/quizController.js";
const router = express.Router();

router.post("/", authenticateUser, createQuiz);
export default router;
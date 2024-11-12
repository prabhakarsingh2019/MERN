import express from "express";
import { authenticateUser } from "../middleware/userAuthenticate.js";
import {
  createQuiz,
  getAllQuiz,
  getQuizById,
} from "../controllers/quizController.js";
const router = express.Router();

router.post("/create-quiz", authenticateUser, createQuiz);

router.get("/quizes", getAllQuiz);

router.get("/:quizId", getQuizById);
export default router;

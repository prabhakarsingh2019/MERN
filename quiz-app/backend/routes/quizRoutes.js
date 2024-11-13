import express from "express";
import { authenticateUser } from "../middleware/userAuthenticate.js";
import {
  createParticipationData,
  createQuiz,
  getAllQuiz,
  getQuizById,
} from "../controllers/quizController.js";
const router = express.Router();

router.post("/create-quiz", authenticateUser, createQuiz);

router.get("/quizes", getAllQuiz);

router.get("/:quizId", getQuizById);
router.post("/participate/:quizId", authenticateUser, createParticipationData);

export default router;

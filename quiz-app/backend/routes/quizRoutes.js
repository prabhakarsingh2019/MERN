import express from "express";
import { authenticateUser } from "../middleware/userAuthenticate.js";
import { createQuiz, getAllQuiz } from "../controllers/quizController.js";
const router = express.Router();

router.post("/create-quiz", authenticateUser, createQuiz);

router.get("/get-quiz", getAllQuiz);
export default router;

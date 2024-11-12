import { json } from "express";
import Quiz from "../models/quizModel.js";

export const createQuiz = async (req, res) => {
  const { title, description, questions } = req.body;
  const creator = req.user.id;
  const { firstName, lastName, username } = req.user;
  const creatorName = `${firstName} ${lastName}`;
  try {
    const quiz = new Quiz({
      title,
      description,
      questions,
      creator,
      creatorName,
      creatorUsername: username,
    });
    await quiz.save();
    res
      .status(200)
      .json({ message: "Quiz created successfully", success: true });
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error), success: false });
  }
};

export const getAllQuiz = async (req, res) => {
  try {
    const quizes = await Quiz.find({}).sort({ createdAt: -1 });
    res.status(200).json(quizes);
  } catch (error) {
    res.status(400).json({ message: error, success: false });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quizId = req.params.quizId;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: JSON.stringify(error) });
  }
};

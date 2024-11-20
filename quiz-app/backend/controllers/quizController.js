import Quiz from "../models/quizModel.js";
import Participation from "../models/participationModel.js";

export const createQuiz = async (req, res) => {
  const { title, description, questions, points } = req.body;
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
      points,
      creatorUsername: username,
    });
    await quiz.save();
    res
      .status(200)
      .json({ message: "Quiz created successfully", success: true });
  } catch (error) {
    res.status(400).json({ message: "Server error", success: false });
  }
};

export const getAllQuiz = async (req, res) => {
  try {
    const quizes = await Quiz.find({});
    res.status(200).json(quizes);
  } catch (error) {
    res.status(400).json({ message: "Server error", success: false });
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
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const createParticipationData = async (req, res) => {
  const quizId = req.params.quizId;
  const { score, selectedAnswers } = req.body;
  const userId = req.user.id;
  const { firstName, lastName, username } = req.user;
  const name = `${firstName} ${lastName}`;
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const existingParticipation = await Participation.findOne({
      creator: quizId,
    });
    if (existingParticipation) {
      const newParticipant = {
        userId,
        username,
        name,
        score,
        selectedAnswers,
      };
      existingParticipation.participants.push(newParticipant);
      await existingParticipation.save();
      return res.status(200).json({
        message: "Your participation has been recorded",
        success: true,
        participation: existingParticipation,
      });
    }
    const newParticipant = {
      userId,
      username,
      name,
      score,
      selectedAnswers,
    };
    const newParticipation = new Participation({
      creator: quizId,
      participants: [newParticipant],
    });
    await newParticipation.save();
    res.status(201).json({
      message: "Your participation has been recorded successfully",
      success: true,
      participation: newParticipation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getParticipationData = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const participation = await Participation.findOne({ creator: quizId });
    if (!participation) {
      return res.status(400).json({
        message: "Participation data not found",
        success: false,
      });
    }
    res.status(200).json(participation);
  } catch (error) {
    res.status(400).json({
      message: "server error",
      success: false,
    });
  }
};

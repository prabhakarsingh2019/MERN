import Quiz from "../models/quizModel.js";

export const createQuiz = async (req, res) => {
  const { title, description, questions } = req.body;
  const creator = req.user.id;
  try {
    const quiz = new Quiz({
      title,
      description,
      questions,
      creator,
    });
    await quiz.save();
    res
      .status(200)
      .json({ message: "Quiz created successfully", success: true });
  } catch (error) {
    res.status(400).json({ message: error, success: false });
  }
};

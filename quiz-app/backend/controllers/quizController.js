import Quiz from "../models/quizModel.js";

export const createQuiz = async (req, res) => {
  const { title, discription, questions } = req.body;
  const creator = req.user.id;
  try {
    const quiz = new Quiz({
      title,
      discription,
      questions,
      creator,
    });
    await quiz.save();
    res
      .status(201)
      .json({ message: "Quiz created successfully", success: true });
  } catch (error) {
    res.status(400).json({ message: "Error creating quiz", success: false });
  }
};

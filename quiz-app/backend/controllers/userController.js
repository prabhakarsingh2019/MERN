import User from "../models/user.js";
import Quiz from "../models/quizModel.js";
import Participation from "../models/participationModel.js";

export const userProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const quizData = await Quiz.find({ creator: userId })
      .select("title description createdAt")
      .sort({ createdAt: -1 });

    const participationData = await Participation.find({
      "participants.userId": userId,
    }).populate("creator", "title description createdAt");

    const participations = participationData.map((data) => {
      const participant = data.participants.find(
        (p) => p.userId.toString() === userId.toString()
      );
      return {
        quizTitle: data.creator.title,
        score: participant.score,
        createdAt: data.createdAt,
      };
    });
    res.status(200).json({
      success: true,
      user,
      quizData,
      participations,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

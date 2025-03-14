import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  option: { type: String },
  isCorrect: { type: Boolean },
});

const questionSchema = new mongoose.Schema({
  question: { type: String },
  options: [optionSchema],
});

const quizzSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    points: {
      type: Number,
    },
    creatorName: { type: String, required: true },
    creatorUsername: { type: String, required: true },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizzSchema);
export default Quiz;

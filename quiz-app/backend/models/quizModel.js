import mongoose from "mongoose";

import { User } from "./user.model";

const optionSchema = new mongoose.Schema({
  option: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [optionSchema],
});

const quizzSchema = new mongoose.Schema(
  {
    title: {
      type: string,
      required: true,
    },
    discription: {
      type: string,
      required: true,
    },
    quetions: {
      type: [questionSchema],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizzSchema);
export default Quiz;

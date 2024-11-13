import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
  selectedAnswers: {
    type: Array,
    required: true,
  },
});

const participationSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    participants: {
      type: [userDataSchema],
      required: true,
    },
  },
  { timestamps: true }
);
const Participation = mongoose.model("Participation", participationSchema);
export default Participation;

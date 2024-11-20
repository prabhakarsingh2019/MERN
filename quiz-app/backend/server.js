import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/userAuthRoutes.js";
import quizzRoutes from "./routes/quizRoutes.js";
import userRoutes from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const corsOptions = {
  origin: "https://quiz-app-frontend-lqmi.onrender.com",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

//mongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizzRoutes);
app.use("/api/user", userRoutes);
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});

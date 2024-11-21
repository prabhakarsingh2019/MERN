import express, { Router } from "express";
import {
  checkAuthStatus,
  generateOtp,
  login,
  logout,
  signup,
  verifyEmail,
} from "../controllers/userControllers.js";
import { authenticateUser } from "../../../quiz-app/backend/middleware/userAuthenticate.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/verify-email", authenticateUser, verifyEmail);

router.post("/generate-token", authenticateUser, generateOtp);

router.post("/logout", logout);

router.get("/user", authenticateUser, checkAuthStatus);

export default router;

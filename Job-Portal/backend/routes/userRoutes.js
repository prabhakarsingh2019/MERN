import express from "express";
import {
  checkAuthStatus,
  forgotPassword,
  generateOtp,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/userControllers.js";

import { resetTokenAuthenticate } from "../middleware/resetPasswordAuthenticate.js";
import { userAuthenticate } from "../middleware/userAuthenticate.js";

const router = express.Router();

// Signup Route
router.post("/auth/signup", signup);

// Login Route
router.post("/auth/login", login);

// Email Verification Route
router.post("/auth/verify-email", userAuthenticate, verifyEmail);

// Generate OTP Route (For email verification or password reset)
router.post("/auth/generate-otp", userAuthenticate, generateOtp);

// Logout Route
router.post("/auth/logout", logout);

// Check Authentication Status Route
router.get("/auth/status", userAuthenticate, checkAuthStatus);

// Forgot Password Route
router.post("/auth/forgot-password", forgotPassword);

router.post(
  "/reset-password/:resetToken",
  resetTokenAuthenticate,
  resetPassword
);

export default router;
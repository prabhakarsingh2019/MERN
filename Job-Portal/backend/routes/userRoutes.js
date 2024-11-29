import express from "express";
import {
  checkAuthStatus,
  deletePicture,
  findUser,
  findUserById,
  findUserByUsername,
  forgotPassword,
  generateOtp,
  login,
  logout,
  profile,
  resetPassword,
  signup,
  updateProfile,
  uploadePicture,
  verifyEmail,
} from "../controllers/userControllers.js";

import { resetTokenAuthenticate } from "../middleware/resetPasswordAuthenticate.js";
import { userAuthenticate } from "../middleware/userAuthenticate.js";
import upload from "../middleware/multer.js";

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
router.get("/profile", userAuthenticate, profile);
router.put("/update", userAuthenticate, updateProfile);
router.get("/users", findUser);
router.get("/id", findUserById);
router.get("/:username", findUserByUsername);
router.delete("/update/remove-profile", userAuthenticate, deletePicture);
router.put(
  "/update/upload-profile",
  userAuthenticate,
  upload.single("profilePicture"),
  uploadePicture
);

export default router;

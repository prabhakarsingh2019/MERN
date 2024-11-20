import express from "express";

import {
  checkAuthStatus,
  generateToken,
  login,
  logout,
  signup,
  verifyEmail,
} from "../controllers/userAuthController.js";

import { authenticateUser } from "../middleware/userAuthenticate.js";
import {
  loginValidation,
  signupValidation,
} from "../middleware/authMiddileware.js";

const router = express.Router();

//Sign up
router.post("/sign-up", signupValidation, signup);

//Login
router.post("/login", loginValidation, login);

router.post("/logout", logout);

router.get("/user", authenticateUser, checkAuthStatus);

router.post("/verify-email", authenticateUser, verifyEmail);

router.post("/generate-token", authenticateUser, generateToken);

export default router;

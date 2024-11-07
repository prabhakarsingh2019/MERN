import express from "express";

import {
  forgotPassword,
  login,
  signup,
} from "../controllers/userController.js";
import {
  loginValidation,
  signupValidation,
} from "../middleware/AuthMiddleware.js";

const router = express.Router();

//Sign up
router.post("/sign-up", signupValidation, signup);

//Login
router.post("/login", loginValidation, login);

router.post("/forgot-password", forgotPassword);
export default router;

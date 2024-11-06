import express from "express";

import { login, signup } from "../controllers/userController.js";
import {
  loginValidation,
  signupValidation,
} from "../middleware/AuthMiddleware.js";

const router = express.Router();

//Sign up
router.post("/sign-up", signupValidation, signup);

//Login
router.post("/login", loginValidation, login);
export default router;

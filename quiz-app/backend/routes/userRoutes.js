import express from "express";

import {
  checkAuthStatus,
  login,
  logout,
  signup,
} from "../controllers/userController.js";

import { authenticateUser } from "../middleware/userAuthenticate.js";

const router = express.Router();

//Sign up
router.post("/sign-up", signup);

//Login
router.post("/login", login);

router.post("/logout", logout);

router.get("/user", authenticateUser, checkAuthStatus);

export default router;

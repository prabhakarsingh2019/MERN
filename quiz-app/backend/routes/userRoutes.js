import express from "express";

import { signup } from "../controllers/userController.js";

const router = express.Router();

//Sign up
router.post("/sign-up", signup);

export default router;

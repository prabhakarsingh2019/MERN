import express from "express";
import { authenticateUser } from "../middleware/userAuthenticate.js";
import { userProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", authenticateUser, userProfile);
export default router;

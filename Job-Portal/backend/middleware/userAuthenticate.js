import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const userAuthenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided", success: false });
  try {
    const decoded = jwt.verify(token, process.env.JwtSECRET_KEY);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

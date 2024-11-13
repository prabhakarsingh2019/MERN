import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  try {
    const userEmail = await User.findOne({ email });
    const usernameExist = await User.findOne({ username });
    if (userEmail || usernameExist) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JwtSECRET_KEY, {
      expiresIn: "24h",
    });
    res.status(200).json({
      message: "User created successfully",
      success: true,
      token,
      email,
      name: user.firstName,
    });
  } catch (error) {
    res.status(400).json({ message: "Server error", success: false });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const errMsg = "Enter valid email and password";
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: errMsg, success: false });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: errMsg, success: false });
    }
    const jwttoken = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JwtSECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({
      message: "Logged in successfully",
      success: true,
      jwttoken,
      email,
      name: user.firstName,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

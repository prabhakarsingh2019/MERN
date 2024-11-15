import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

import { verifyEmail } from "../mails/template.js";
import { transporter } from "../mails/nodemailerTransporter.js";

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

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
    const verificationToken = Math.floor(100000 + Math.random() * 900000);

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JwtSECRET_KEY, {
      expiresIn: "24h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log(process.env.EMAIL_ADDRESS);
    console.log(process.env.EMAIL_PASSWORD);

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Verify your email",
      text: `Otp for your email verification`,
      html: verifyEmail.replace("{verificationCode}", verificationToken),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error: ", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({
      message: "User created successfully",
      success: true,
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
    const token = jwt.sign({ userId: user._id }, process.env.JwtSECRET_KEY, {
      expiresIn: "24h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Logged in successfully",
      success: true,
      email,
      name: user.firstName,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const checkAuthStatus = async (req, res) => {
  const user = req.user;
  try {
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token." });
  }
};

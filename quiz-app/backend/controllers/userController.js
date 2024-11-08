import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import { resetTemplate } from "../mails/template.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

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
    res.status(200).json({
      message: "Sign in successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).send(error.message);
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
      { email: user.email, userId: user._id },
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
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

/*export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const errMsg = "Enter valid email";
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: errMsg, success: false });
    }

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: "Password reset email",
      text: "Link will be expire within 1h",
      html: resetTemplate.replace("[User's Name]", user.firstName),
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: "Password reset link sent to your email",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};*/

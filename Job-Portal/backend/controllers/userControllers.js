import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import joi from "joi";
import crypto from "crypto";
import { transporter } from "../mails/emailtranspoerter.js";
import {
  forgot_pass_email_template,
  verify_email_template,
  welcome_email_template,
} from "../mails/template.js";
import { verifyOtp } from "../utils/verifyOtp.js";

const signupValidationSchema = joi.object({
  fullName: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  role: joi.string().valid("student", "recruiter").default("student"),
});

const loginValidationSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const emailValidationSchema = joi.object({
  email: joi.string().email().required(),
});

export const signup = async (req, res) => {
  const { fullName, password, email, role } = req.body;
  const { error } = signupValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: `Validation error: ${error.details[0].message}`,
      success: false,
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message:
          "An account already exists with this email. Please try a different email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    const hashedToken = await bcrypt.hash(verificationToken.toString(), 10);
    const newUser = new User({
      fullName,
      password: hashedPassword,
      email,
      role,
      verificationToken: hashedToken,
      verificationExpiresAt: Date.now() + 60 * 60 * 1000,
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JwtSECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Verify your email",
      text: `OTP for your email verification`,
      html: verify_email_template.replace(
        "{verificationCode}",
        verificationToken
      ),
    };
    transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "User created successfully",
      success: true,
      email,
      name: newUser.fullName,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Something went wrong while creating the user. Please try again later.",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { password, email } = req.body;
  const { error } = loginValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: `Validation error: ${error.details[0].message}`,
      success: false,
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        message:
          "No account associated with this email. Please enter a valid email or register.",
        success: false,
      });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password. Please try again.",
        success: false,
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JwtSECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Logged in successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while logging in. Please try again later.",
      success: false,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  const userId = req.user._id;
  const result = await verifyOtp(
    userId,
    code,
    "verificationToken",
    "verificationExpiresAt",
    "Email verified successfully. Welcome aboard!"
  );

  if (!result.success) {
    return res
      .status(result.status)
      .json({ message: result.message, success: result.success });
  }

  const user = await User.findById(userId);
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: user.email,
    subject: "Welcome to our platform!",
    text: "",
    html: welcome_email_template.replace("{fullName}", user.fullName),
  };
  await transporter.sendMail(mailOptions);

  return res
    .status(result.status)
    .json({ success: result.success, message: result.message });
};

export const generateOtp = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please try again." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    const verificationExpiresAt = Date.now() + 60 * 60 * 1000;
    user.verificationToken = hashedOtp;
    user.verificationExpiresAt = verificationExpiresAt;
    await user.save();
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: "Verify your email",
      text: `OTP for your email verification`,
      html: verify_email_template.replace("{verificationCode}", otp),
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please check your email.",
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Something went wrong while generating OTP. Please try again later.",
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully." });
};

export const checkAuthStatus = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found. Please log in again.",
        success: false,
      });
    }
    res.status(200).json({ message: "User is authenticated.", success: true });
  } catch (error) {
    res.status(500).json({
      message:
        "Something went wrong while checking authentication status. Please try again later.",
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const { error } = emailValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: `Validation error: ${error.details[0].message}`,
      success: false,
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found. Please check your email and try again.",
        success: false,
      });
    }
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JwtSECRET_KEY, {
      expiresIn: "5m",
    });
    res.cookie("resetJwtToken", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 5 * 60 * 1000,
    });
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);
    const tokenExpiresAt = Date.now() + 5 * 60 * 1000;
    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordTokenExpiresAt = tokenExpiresAt;
    await user.save();
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: "Reset Your Password",
      text: `Click the link below to reset your password`,
      html: forgot_pass_email_template.replace("{resetLink}", resetLink),
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: "Password reset link sent to your email.",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Something went wrong while sending password reset link. Please try again later.",
      success: false,
    });
  }
};

export const resetPassword = async (req, res) => {
  const userId = req.user._id;
  const { password } = req.body;
  const { resetToken } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    if (user.forgotPasswordTokenExpiresAt < Date.now()) {
      return res.status(400).json({
        message: "Reset token has expired.",
        success: false,
      });
    }
    const isValid = bcrypt.compare(resetToken, user.forgotPasswordToken);
    if (!isValid) {
      return res.status(400).json({
        message: "Invalid Token",
        success: false,
      });
    }
    user.password = await bcrypt.hash(password, 10);
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiresAt = undefined;
    res.clearCookie("token");
    res.clearCookie("authJwtToken");
    await user.save();
    res.status(200).json({
      message: "Password reset successfully.",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Something went wrong while resetting password. Please try again later.",
      success: false,
    });
  }
};
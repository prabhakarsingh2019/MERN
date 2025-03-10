import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const verifyOtp = async (
  userId,
  code,
  tokenField,
  expiresAtField,
  successMessage
) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        status: 404,
        message: "User not found. Please try again.",
        success: false,
      };
    }

    const isMatch = await bcrypt.compare(code, user[tokenField]);
    if (!isMatch) {
      return {
        status: 401,
        message:
          "Invalid verification code. Please check the code and try again.",
        success: false,
      };
    }
    user[tokenField] = undefined;
    user[expiresAtField] = undefined;
    await user.save();

    return { status: 200, message: successMessage, success: true };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
      success: false,
    };
  }
};

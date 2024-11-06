import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password || !username) {
      throw new Error("All fields are required");
    }
    const userEmail = await User.findOne({ email });
    const usernameExist = await User.findOne({ username });
    if (userEmail || usernameExist) {
      return res.status(400).send("User already exists");
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
    res.send("User registered successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

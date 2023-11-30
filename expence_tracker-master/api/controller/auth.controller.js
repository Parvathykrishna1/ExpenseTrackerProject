import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const SignUp = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    if (!username || !password || !email) {
      return res.status(400).json({
        statusCode: 400,
        message: "All fields required...!",
      });
    }

    const ExistingUser = await User.findOne({
      email,
    });
    if (ExistingUser) {
      return res.status(402).json({
        statusCode: 402,
        message: "Email already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      statusCode: 200,
      message: "Registration successful",
      data: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).json({
        statusCode: 401,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "User not exist",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
  } catch (error) {}
};

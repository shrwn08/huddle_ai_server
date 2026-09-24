import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const isMatched = await User.findOne({ email });

    if (isMatched) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    await User.create({
      fullname,
      email,
      password,
    });

    return res
      .status(201)
      .json({ success: true, message: "User successfully registered" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)[0].message;
      return res.status(400).json({ success: false, message: errorMessage });
    }

    res
      .status(500)
      .json({ message: "Server unable to signup", sucess: false, error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    
    if (!user) {
        return res
        .status(400)
        .json({ success: false, message: "Invalid creadential" });
    }
    
    const isPasswordMatched = await user.comparePassword(password);


    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credential" });
    }

    const token = await jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "7d" },
    );

    res
      .status(200)
      .json({ success: true, token, message: "Loggedin successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

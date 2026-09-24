import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.models.js";
dotenv.config();

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    const token = authHeader.startWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const user = await User.findById(decoded.id).selected(-password);

    if (!user) {
      return res.status(401).json({ message: "No user found", success: false });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }
};

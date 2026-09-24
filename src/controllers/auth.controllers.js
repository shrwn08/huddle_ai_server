import User from "../models/user.models.js";

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

import User from "../models/user.js";
import bcrypt from "bcrypt";

const registerUser = async (request, response) => {
  try {
    const { email, name, password } = request.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response
        .status(400)
        .json({ message: "Email address is already registered" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    response
      .status(201)
      .json({
        message:
          "Verification email sent to your email. Please check and verify your email to complete registration.",
      });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const loginUser = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

export { registerUser, loginUser };

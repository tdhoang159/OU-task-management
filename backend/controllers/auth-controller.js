import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Verification from "../models/verification.js";
import { sendEmail } from "../libs/send-email.js";

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

    const verificationToken = jwt.sign(
      { userId: newUser._id, property: "email-verification" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await Verification.create({
      userId: newUser._id,
      token: verificationToken,
      expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
    });

    //send email
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    const emailBody = `<p>Click <a href="${verificationLink}">here</a> to verify your email</p>`;

    const emailSubject = "Verify your email address";

    const isEmailSent = await sendEmail(email, emailSubject, emailBody);

    if (!isEmailSent) {
      return response.status(500).json({
        message: "Failed to send verification email. Please try again later.",
      });
    }

    response.status(201).json({
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

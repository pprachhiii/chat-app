import { User } from "../models/models.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../lib/mailer.js";
import {
  verifyEmailTemplate,
  loginOtpTemplate,
} from "../lib/emailTemplates.js";
import { generateToken } from "../lib/utils.js";

// -----------------------
// SIGNUP
// -----------------------
export const signup = async (req, res) => {
  const { username, fullName, email, password } = req.body;

  try {
    if (!username || !fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    const newUser = new User({
      username: username.toLowerCase().trim(),
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    await newUser.save();

    // Signup is successful — no email verification
    res.status(201).json({
      message: "Signup successful. You can now log in and receive OTP.",
    });
  } catch (error) {
    console.error("Error in signup:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -----------------------
// LOGIN (step 1: password check + send OTP)
// -----------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.loginOTP = otp;
    user.loginOTPExpiry = Date.now() + 1000 * 60 * 10; // 10 min
    await user.save();

    await sendEmail(
      user.email,
      "Your Chat App Login OTP",
      loginOtpTemplate(user.fullName, otp)
    );

    res.status(200).json({
      message: "OTP sent to email. Please verify OTP to complete login.",
    });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -----------------------
// VERIFY LOGIN OTP
// -----------------------
export const verifyLoginOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({
      email,
      loginOTP: otp,
      loginOTPExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    user.loginOTP = undefined;
    user.loginOTPExpiry = undefined;
    await user.save();

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
      status: user.status,
      lastSeen: user.lastSeen,
    });
  } catch (error) {
    console.error("Error in verifyLoginOTP:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -----------------------
// LOGOUT
// -----------------------
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true, secure: true });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -----------------------
// CHECK AUTH
// -----------------------
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in checkAuth:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

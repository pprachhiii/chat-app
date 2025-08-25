import { User } from "../models/models.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

// SIGNUP
export const signup = async (req, res) => {
  const { username, fullName, email, password } = req.body;
  try {
    if (!username || !fullName || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });

    const newUser = new User({
      username: username.toLowerCase().trim(),
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful. You can now log in.",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// LOGIN – email/password only
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// LOGOUT
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true, secure: true });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// CHECK AUTH
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

import { User } from "../models/models.js";
import bcrypt from "bcryptjs";

// -----------------------
// CHANGE PASSWORD (user knows current password)
// -----------------------
export const changePassword = async (req, res) => {
  const { username, currentPassword, newPassword, retypePassword } = req.body;

  try {
    if (!username || !currentPassword || !newPassword || !retypePassword)
      return res.status(400).json({ message: "All fields are required." });

    if (newPassword !== retypePassword)
      return res.status(400).json({ message: "Passwords do not match." });

    const user = await User.findOne({ username }).select("+password");
    if (!user) return res.status(400).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });

    user.password = newPassword; // hashed automatically via pre-save hook
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error in changePassword:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -----------------------
// RESET PASSWORD (manual reset, no email)
// -----------------------
export const resetPassword = async (req, res) => {
  const { username, newPassword, retypePassword } = req.body;

  try {
    if (!username || !newPassword || !retypePassword)
      return res.status(400).json({ message: "All fields are required." });

    if (newPassword !== retypePassword)
      return res.status(400).json({ message: "Passwords do not match." });

    const user = await User.findOne({ username }).select("+password");
    if (!user) return res.status(400).json({ message: "User not found." });

    user.password = newPassword; // hashed automatically
    await user.save();

    res
      .status(200)
      .json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

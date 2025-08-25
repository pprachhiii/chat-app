import { User } from "../models/models.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../lib/mailer.js";
import {
  forgotPasswordTemplate,
  changePasswordNotificationTemplate,
  passwordResetSuccessTemplate,
} from "../lib/emailTemplates.js";

// -----------------------
// FORGOT PASSWORD (user forgot password)
// -----------------------
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "No user found with this email." });

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = Date.now() + 1000 * 60 * 30; // 30 minutes
    await user.save();

    // Use forgotPasswordTemplate
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const emailHTML = forgotPasswordTemplate(user.fullName, resetUrl);
    await sendEmail(user.email, "Reset Your Password", emailHTML);

    res.status(200).json({
      message: "Password reset email sent. Please check your inbox.",
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -----------------------
// CHANGE PASSWORD (user knows current password)
// -----------------------
export const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword, retypePassword } = req.body;

  try {
    if (!email || !currentPassword || !newPassword || !retypePassword)
      return res.status(400).json({ message: "All fields are required." });

    if (newPassword !== retypePassword)
      return res.status(400).json({ message: "Passwords do not match." });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });

    user.password = newPassword; // hashed via pre-save hook
    await user.save();

    // Use changePasswordNotificationTemplate
    const emailHTML = changePasswordNotificationTemplate(user.fullName);
    await sendEmail(user.email, "Password Changed Successfully", emailHTML);

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error in changePassword:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -----------------------
// RESET PASSWORD (via forgot password token)
// -----------------------
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, retypePassword } = req.body;

  try {
    if (!newPassword || !retypePassword)
      return res
        .status(400)
        .json({ message: "Both new password fields are required." });

    if (newPassword !== retypePassword)
      return res.status(400).json({ message: "Passwords do not match." });

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token." });

    user.password = newPassword; // hashed via pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    const emailHTML = passwordResetSuccessTemplate(user.fullName);
    await sendEmail(user.email, "Password Updated Successfully", emailHTML);

    res
      .status(200)
      .json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

import { User } from "../models/models.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../lib/mailer.js";
import { passwordResetSuccessTemplate } from "../lib/emailTemplates.js";

// -----------------------
// FORGOT PASSWORD (verify previous password)
// -----------------------
export const forgotPassword = async (req, res) => {
  const { email, previousPassword } = req.body;

  try {
    if (!email || !previousPassword) {
      return res
        .status(400)
        .json({ message: "Email and previous password are required." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res
        .status(400)
        .json({ message: "No user found with this email." });

    const isMatch = await bcrypt.compare(previousPassword, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Previous password is incorrect." });

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = Date.now() + 1000 * 60 * 30; // 30 minutes
    await user.save();

    // Return token to frontend (or frontend can use it to navigate to reset page)
    res.status(200).json({
      message: "Previous password verified. You can now set a new password.",
      resetToken,
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -----------------------
// RESET PASSWORD
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

    // Send professional email confirmation using template
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

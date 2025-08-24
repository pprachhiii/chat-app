import { User } from "../models/models.js";
import { generateToken } from "../lib/utils.js";

// -----------------------
// VERIFY EMAIL (after signup)
// -----------------------
export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    res
      .status(200)
      .json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    console.error("Error in verifyEmail:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -----------------------
// VERIFY LOGIN OTP (step 2)
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

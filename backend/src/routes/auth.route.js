import express from "express";
import {
  signup,
  login,
  logout,
  checkAuth,
} from "../controllers/authController.js";
import {
  verifyEmail,
  verifyLoginOTP,
} from "../controllers/verifyController.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/passwordController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// -----------------------
// PUBLIC ROUTES
// -----------------------
router.post("/signup", signup); // Register a new user + send verification email
router.post("/login", login); // Login and send OTP
router.post("/verify-login-otp", verifyLoginOTP); // Verify OTP for login
router.get("/verify-email/:token", verifyEmail); // Verify email link
router.post("/forgot-password", forgotPassword); // Verify previous password & get reset token
router.post("/reset-password/:token", resetPassword); // Reset password using token

// -----------------------
// PROTECTED ROUTES
// -----------------------
router.get("/check-auth", protectRoute, checkAuth); // Check if user is authenticated
router.post("/logout", protectRoute, logout); // Logout user

export default router;

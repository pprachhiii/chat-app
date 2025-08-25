import express from "express";
import {
  signup,
  login,
  logout,
  checkAuth,
} from "../controllers/auth.controller.js";
import {
  resetPassword,
  changePassword,
} from "../controllers/password.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// -----------------------
// PUBLIC ROUTES
// -----------------------
router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password", resetPassword);

// -----------------------
// PROTECTED ROUTES
// -----------------------
router.get("/check-auth", protectRoute, checkAuth);
router.post("/logout", protectRoute, logout);
router.post("/change-password", protectRoute, changePassword);

export default router;

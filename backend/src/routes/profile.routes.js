import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  updateProfile,
  getUserMiniProfile,
} from "../controllers/profileController.js";

const router = express.Router();

// Update profile (fullName, bio, profilePic)
router.put("/update", protectRoute, updateProfile);

// Get mini-profile of a user (for chat popups)
router.get("/mini/:userId", protectRoute, getUserMiniProfile);

export default router;

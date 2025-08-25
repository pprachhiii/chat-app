import express from "express";
import {
  getChats,
  accessChat,
  createGroupChat,
} from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all chats for logged-in user (sidebar)
router.get("/", protectRoute, getChats);

// Access or create one-to-one chat
router.post("/access", protectRoute, accessChat);

// Create group chat
router.post("/group", protectRoute, createGroupChat);

export default router;

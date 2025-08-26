import express from "express";
import {
  getMessages,
  sendMessage,
  editMessage,
  deleteMessage,
  startChatByUsername,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all messages between logged-in user and another user
router.get("/:id", protectRoute, getMessages);

// Send a new message
router.post("/send/:id", protectRoute, sendMessage);

// Edit an existing message
router.put("/edit/:messageId", protectRoute, editMessage);

// Delete a message (soft delete)
router.delete("/delete/:messageId", protectRoute, deleteMessage);

// Start chat by username
router.post("/start-chat", protectRoute, startChatByUsername);

export default router;

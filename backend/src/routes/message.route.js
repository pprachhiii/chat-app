import express from "express";
import {
  getMessages,
  sendMessage,
  editMessage,
  deleteMessage,
} from "../controllers/messageController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all messages for a chat
router.get("/:chatId", protectRoute, getMessages);

// Send a message
router.post("/:chatId", protectRoute, sendMessage);

// Edit a message
router.put("/edit/:messageId", protectRoute, editMessage);

// Delete a message
router.delete("/delete/:messageId", protectRoute, deleteMessage);

export default router;

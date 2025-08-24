import { Message, Chat, User } from "../models/models.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

// -----------------------
// Get messages for a chat
// -----------------------
export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId })
      .populate("senderId", "username fullName profilePic status")
      .populate("replyTo", "text senderId");

    // Mark all unread messages from other participants as "read"
    const unreadMessages = messages.filter(
      (msg) =>
        msg.senderId._id.toString() !== req.user._id.toString() &&
        msg.status !== "read"
    );
    await Promise.all(
      unreadMessages.map(async (msg) => {
        msg.status = "read";
        await msg.save();
      })
    );

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -----------------------
// Send a message
// -----------------------
export const sendMessage = async (req, res) => {
  try {
    const { text, messageType, file } = req.body;
    const { chatId } = req.params;
    const senderId = req.user._id;

    let fileUrl;
    if (file) {
      const uploadResponse = await cloudinary.uploader.upload(file);
      fileUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      chatId,
      senderId,
      messageType: messageType || (file ? "image" : "text"),
      text: text || "",
      fileUrl: fileUrl || "",
    });

    await newMessage.save();

    // Update lastMessage in Chat
    await Chat.findByIdAndUpdate(chatId, { lastMessage: newMessage._id });

    // Emit via socket to participants
    const chat = await Chat.findById(chatId);
    chat.participants.forEach((participantId) => {
      if (participantId.toString() !== senderId.toString()) {
        const socketId = getReceiverSocketId(participantId);
        if (socketId) io.to(socketId).emit("newMessage", newMessage);
      }
    });

    const populatedMessage = await newMessage.populate(
      "senderId",
      "username fullName profilePic status"
    );
    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Error in sendMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -----------------------
// Edit message
// -----------------------
export const editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { newText } = req.body;

    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    if (message.senderId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    message.text = newText;
    message.isEdited = true;
    await message.save();

    res.status(200).json(message);
  } catch (error) {
    console.error("Error in editMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -----------------------
// Delete message
// -----------------------
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    if (message.senderId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    message.isDeleted = true;
    await message.save();

    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    console.error("Error in deleteMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

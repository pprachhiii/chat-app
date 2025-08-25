import { Message, User } from "../models/models.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

// -----------------------
// Get messages between two users
// -----------------------
export const getMessages = async (req, res) => {
  try {
    const userId1 = req.user._id;
    const { userId2 } = req.params; // the other participant

    // Fetch messages where either user is sender or receiver
    const messages = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    })
      .sort({ createdAt: 1 }) // oldest first
      .populate("senderId", "username fullName profilePic status")
      .populate("replyTo", "text senderId");

    // Mark unread messages as read
    const unreadMessages = messages.filter(
      (msg) => msg.senderId._id.toString() === userId2 && msg.status !== "read"
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
// Send a message to a user
// -----------------------
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId, text, messageType, file } = req.body;

    let fileUrl;
    if (file) {
      const uploadResponse = await cloudinary.uploader.upload(file);
      fileUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      messageType: messageType || (file ? "image" : "text"),
      text: text || "",
      fileUrl: fileUrl || "",
    });

    await newMessage.save();

    // Emit via socket to the receiver
    const socketId = getReceiverSocketId(receiverId);
    if (socketId) io.to(socketId).emit("newMessage", newMessage);

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

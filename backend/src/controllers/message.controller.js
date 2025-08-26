import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { Message, User } from "../models/models.js";

// Get chat messages between logged-in user and another user
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    })
      .populate("senderId", "username fullName profilePic")
      .populate("receiverId", "username fullName profilePic")
      .populate("replyTo");

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Send a message (text, image, file, etc.)
export const sendMessage = async (req, res) => {
  try {
    const { text, image, fileUrl, messageType = "text", replyTo } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let uploadedImageUrl = null;

    if (image && messageType === "image") {
      const uploadResponse = await cloudinary.uploader.upload(image);
      uploadedImageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      messageType,
      text: text || "",
      fileUrl: messageType === "image" ? uploadedImageUrl : fileUrl || "",
      replyTo: replyTo || null,
    });

    await newMessage.save();

    // Emit real-time message via socket
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Edit a message
export const editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { text, fileUrl } = req.body;
    const userId = req.user._id;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Only sender can edit
    if (message.senderId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You can only edit your own messages" });
    }

    // Update fields
    if (text !== undefined) message.text = text;
    if (fileUrl !== undefined) message.fileUrl = fileUrl;
    message.isEdited = true;

    await message.save();

    // Emit real-time update if needed
    const receiverSocketId = getReceiverSocketId(message.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageEdited", message);
    }

    res.status(200).json(message);
  } catch (error) {
    console.error("Error in editMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a message (soft delete)
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Only sender can delete
    if (message.senderId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You can only delete your own messages" });
    }

    // Soft delete
    message.isDeleted = true;
    await message.save();

    // Emit real-time update if needed
    const receiverSocketId = getReceiverSocketId(message.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", message._id);
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Start a chat by username
export const startChatByUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const myId = req.user._id;

    // Find the user to chat with
    const userToChat = await User.findOne({
      username: username.toLowerCase(),
    }).select("-password");
    if (!userToChat) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch existing messages, if any
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChat._id },
        { senderId: userToChat._id, receiverId: myId },
      ],
    })
      .populate("senderId", "username fullName profilePic")
      .populate("receiverId", "username fullName profilePic");

    res.status(200).json({ user: userToChat, messages });
  } catch (error) {
    console.error("Error in startChatByUsername: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

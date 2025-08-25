import { Chat, Message, User } from "../models/models.js";

// -----------------------
// Get all chats for logged-in user (sidebar)
// -----------------------
export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch chats
    const chats = await Chat.find({ participants: userId })
      .populate("participants", "-password")
      .populate({
        path: "lastMessage",
        populate: { path: "senderId", select: "username fullName profilePic" },
      })
      .sort({ updatedAt: -1 });

    // Mark lastMessage as read if sent by others and status is not "read"
    await Promise.all(
      chats.map(async (chat) => {
        if (
          chat.lastMessage &&
          chat.lastMessage.senderId._id.toString() !== userId.toString() &&
          chat.lastMessage.status !== "read"
        ) {
          chat.lastMessage.status = "read";
          await chat.lastMessage.save();
        }
      })
    );

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error in getChats: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -----------------------
// Create or get one-to-one chat
// -----------------------
export const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const loggedInUserId = req.user._id;

    if (!userId) return res.status(400).json({ message: "UserId required" });

    let chat = await Chat.findOne({
      isGroup: false,
      participants: { $all: [loggedInUserId, userId] },
    }).populate("participants", "-password");

    if (!chat) {
      chat = await Chat.create({
        participants: [loggedInUserId, userId],
      });
      chat = await chat.populate("participants", "-password");
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error in accessChat: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -----------------------
// Create Group Chat
// -----------------------
export const createGroupChat = async (req, res) => {
  try {
    const { name, participantIds } = req.body;
    if (!name || !participantIds || participantIds.length < 2)
      return res
        .status(400)
        .json({ message: "Name and 2+ participants required" });

    const chat = await Chat.create({
      name,
      isGroup: true,
      participants: [req.user._id, ...participantIds],
    });

    const fullChat = await chat.populate("participants", "-password");
    res.status(201).json(fullChat);
  } catch (error) {
    console.error("Error in createGroupChat: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

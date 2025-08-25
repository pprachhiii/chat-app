import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  chats: [],
  messages: [],
  selectedChat: null,
  isChatsLoading: false,
  isMessagesLoading: false,

  // Fetch all chats for logged-in user
  getChats: async () => {
    set({ isChatsLoading: true });
    try {
      const res = await axiosInstance.get("/api/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load chats");
    } finally {
      set({ isChatsLoading: false });
    }
  },

  // Access or create 1-to-1 chat
  accessChat: async (userId) => {
    try {
      const res = await axiosInstance.post("/api/chats/access", { userId });
      set({ selectedChat: res.data });
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to access chat");
    }
  },

  // Create group chat
  createGroupChat: async (groupData) => {
    try {
      const res = await axiosInstance.post("/api/chats/group", groupData);
      set({ chats: [...get().chats, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create group");
    }
  },

  // Get all messages for selected chat
  getMessages: async (chatId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/api/messages/${chatId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a message (text, file, etc.)
  sendMessage: async (chatId, messageData) => {
    try {
      const res = await axiosInstance.post(
        `/api/messages/${chatId}`,
        messageData
      );
      set({ messages: [...get().messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  // Edit a message
  editMessage: async (messageId, text) => {
    try {
      const res = await axiosInstance.put(`/api/messages/edit/${messageId}`, {
        text,
      });
      set({
        messages: get().messages.map((msg) =>
          msg._id === messageId ? res.data : msg
        ),
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to edit message");
    }
  },

  // Delete a message
  deleteMessage: async (messageId) => {
    try {
      await axiosInstance.delete(`/api/messages/delete/${messageId}`);
      set({
        messages: get().messages.map((msg) =>
          msg._id === messageId ? { ...msg, isDeleted: true } : msg
        ),
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  },

  // Subscribe to socket events
  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    const { selectedChat } = get();
    if (!selectedChat) return;

    socket.on("newMessage", (newMessage) => {
      if (newMessage.chatId === selectedChat._id) {
        set({ messages: [...get().messages, newMessage] });
      }
    });

    socket.on("messageEdited", (updatedMessage) => {
      set({
        messages: get().messages.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        ),
      });
    });

    socket.on("messageDeleted", (deletedMessageId) => {
      set({
        messages: get().messages.map((msg) =>
          msg._id === deletedMessageId ? { ...msg, isDeleted: true } : msg
        ),
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("messageEdited");
    socket.off("messageDeleted");
  },

  setSelectedChat: (selectedChat) => set({ selectedChat }),
}));

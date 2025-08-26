import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  editMessage: async (messageId, updatedData) => {
    const { messages } = get();
    try {
      const res = await axiosInstance.put(
        `/messages/edit/${messageId}`,
        updatedData
      );
      set({
        messages: messages.map((msg) =>
          msg._id === messageId ? res.data : msg
        ),
      });
      toast.success("Message edited successfully");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to edit message");
    }
  },

  deleteMessage: async (messageId) => {
    const { messages } = get();
    try {
      await axiosInstance.delete(`/messages/delete/${messageId}`);
      set({
        messages: messages.filter((msg) => msg._id !== messageId),
      });
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to delete message");
    }
  },

  startChatByUsername: async (username) => {
    try {
      const { data } = await axiosInstance.post("/messages/start-chat", {
        username,
      });
      const { user, messages } = data;

      set({
        selectedUser: user,
        messages: messages,
      });
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to start chat");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

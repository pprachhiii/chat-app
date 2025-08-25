import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  chats: [],
  selectedChat: null,
  messages: [],
  isChatsLoading: false,
  isMessagesLoading: false,

  setChats: (chats) => set({ chats }),
  setSelectedChat: (chat) => set({ selectedChat: chat }),
  setMessages: (messages) => set({ messages }),

  getChats: async () => {
    set({ isChatsLoading: true });
    try {
      const res = await fetch("/api/chats");
      const data = await res.json();
      set({ chats: data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isChatsLoading: false });
    }
  },

  getMessages: async (chatId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await fetch(`/api/messages?chatId=${chatId}`);
      const data = await res.json();
      set({ messages: data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  addChatIfNotExists: (newChat) => {
    const { chats } = get();
    const exists = chats.some((chat) =>
      chat.users.every((u) => newChat.users.some((nu) => nu._id === u._id))
    );
    if (!exists) set({ chats: [newChat, ...chats] });
    set({ selectedChat: newChat });
  },

  subscribeToMessages: () => {
    /* implement real-time subscription */
  },
  unsubscribeFromMessages: () => {
    /* cleanup */
  },
}));

import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  onlineUsers: [],
  socket: null,

  // Restore session on app load
  restoreSession: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      console.log(err);
      set({ authUser: null });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data); // login sets JWT cookie
      set({ authUser: res.data });
      get().connectSocket();
      return res.data;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout"); // clears cookie on backend
    } finally {
      set({ authUser: null });
      get().disconnectSocket();
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, { query: { userId: authUser._id } });
    newSocket.connect();
    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds) => set({ onlineUsers: userIds }));
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
  },

  setAuthUser: (user) => set({ authUser: user }),
}));

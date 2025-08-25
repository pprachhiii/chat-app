import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isVerifyingOtp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isResettingPassword: false,
  isChangingPassword: false,
  onlineUsers: [],
  socket: null,

  // Check auth on app load
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Signup
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      await axiosInstance.post("/auth/signup", data);
      toast.success("Account created! Check your inbox to verify email.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Login (step 1: send OTP)
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      await axiosInstance.post("/auth/login", data);
      toast.success("OTP sent to your email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Verify Email
  verifyEmail: async (token) => {
    try {
      await axiosInstance.get(`/auth/verify-email/${token}`);
      toast.success("Email verified! You can now log in.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Email verification failed");
    }
  },

  // Verify OTP (step 2: actually log in)
  verifyLoginOtp: async (data) => {
    set({ isVerifyingOtp: true });
    try {
      const res = await axiosInstance.post("/auth/verify-login-otp", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      set({ isVerifyingOtp: false });
    }
  },

  // Forgot Password (send reset link)
  forgotPassword: async (data) => {
    set({ isResettingPassword: true });
    try {
      const res = await axiosInstance.post("/auth/forgot-password", data);
      toast.success(res.data.message || "Password reset link sent to email");
      return res.data; // contains only message
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
      throw error;
    } finally {
      set({ isResettingPassword: false });
    }
  },

  // Reset Password (via token)
  resetPassword: async (token, data) => {
    set({ isResettingPassword: true });
    try {
      const res = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        data
      );
      toast.success(
        res.data.message || "Password reset successfully, login again"
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
      throw error;
    } finally {
      set({ isResettingPassword: false });
    }
  },

  // Change Password (logged-in user, requires current password)
  changePassword: async (data) => {
    set({ isChangingPassword: true });
    try {
      const res = await axiosInstance.post("/auth/change-password", data);
      toast.success(res.data.message || "Password changed successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
      throw error;
    } finally {
      set({ isChangingPassword: false });
    }
  },

  // Logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  // Update Profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/profile/update", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
      throw error;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Socket
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, { query: { userId: authUser._id } });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

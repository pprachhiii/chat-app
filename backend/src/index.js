import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import profileRoutes from "./routes/profile.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const __dirname = path.resolve();

// -----------------------
// MIDDLEWARE
// -----------------------
app.use(express.json({ limit: "10mb" })); // allow large payloads (images, files)
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// -----------------------
// ROUTES
// -----------------------
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);

// -----------------------
// SERVE FRONTEND IN PRODUCTION
// -----------------------
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// -----------------------
// START SERVER
// -----------------------
const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

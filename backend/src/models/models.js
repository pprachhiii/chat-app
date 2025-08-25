import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// =======================
// USER MODEL
// =======================
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    fullName: { type: String, required: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    profilePic: {
      public_id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    bio: {
      type: String,
      maxlength: 160,
      default: "Hey there! I'm using ChatApp",
    },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["online", "offline", "away", "busy"],
      default: "offline",
    },
    lastSeen: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

// =======================
// MESSAGE MODEL (ONE-ON-ONE ONLY)
// =======================
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file", "voice"],
      default: "text",
    },
    text: { type: String, trim: true },
    fileUrl: String,
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
    isEdited: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    reactions: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        emoji: String,
      },
    ],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export { User, Message };

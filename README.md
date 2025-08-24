---
# Real-time Chat Application 💬

A **production-ready full-stack chat application** built with **React**, **Express.js**, **Socket.IO**, and **MongoDB** 💻.
The app now supports **secure authentication flows, real-time messaging, group chats, file sharing, read receipts, user presence, mini-profiles, and more** 🔒.

This project showcases **scalable backend design, modern frontend architecture, authentication/security best practices, and real-time communication features** - perfect for professional portfolios or production use 🚀.
---

## Key Features 🔑

### Authentication & Security 🔐

- **Email Verification (Registration)**: Users must confirm their email via a secure verification link 📧.
- **OTP-based Login**: Passwordless login with a one-time OTP sent to email 🔑.
- **Password Reset**: Secure reset flow with token + expiry verification 🔄.
- **Hashed Passwords**: Stored securely using bcrypt with strong hashing 🛡️.
- **JWT Authentication**: Token-based access to protected APIs 🔐.
- **Account Protection**: Blocked users, brute-force prevention, and login attempt validation 🚫.

### User Features 👤

- Full profile management: **username, full name, email, bio, and Cloudinary-hosted profile picture** 🖼️.
- Update **bio, profile picture, and name** ✏️.
- View **mini-profile popups** in chat for participants 👀.
- Manage **contacts** and **blocked users** 📇.
- Track **status** (`online`, `offline`, `away`, `busy`) and **last seen** ⏱️.

### Messaging 💬

- **One-to-One and Group Chats** 👥.

- **Multiple Message Types**: text, image, file, voice 📝.

- **Message Status**: `sent`, `delivered`, `read` 📬.

- **Advanced Chat Features**:

  - Reply to messages ↩️.
  - Reactions with emojis 😄.
  - Edit and delete messages ✏️🗑️.

- **Cloudinary Integration**: Media files stored in Cloudinary, metadata stored in MongoDB ☁️.

### Real-time Functionality ⚡

- **Instant messaging** powered by **Socket.IO** ⚡.
- **User presence tracking** (online/offline/away/busy) 👥.
- **Live delivery/read receipts** for messages ✅.

### Frontend Experience 🎨

- **Theme management**: Light and Dark modes 🌗.
- **Private routes** for authenticated users 🔒.
- **Toast notifications** for interactions, system alerts, and status updates 🔔.
- **Mini-profile popups** when viewing participants in chat 👁️.

---

## Tech Stack 🛠️

- **Frontend**: React.js, React Router, Zustand (state management), Lucide Icons, React Hot Toast 🖥️.
- **Backend**: Express.js, Socket.IO, JWT, Bcrypt.js ⚙️.
- **Database**: MongoDB (Mongoose ODM) 🗄️.
- **Media Storage**: Cloudinary ☁️.
- **Authentication & Security**: OTP login, Email verification, Password reset, JWT 🔐.

---

## Prerequisites 📋

- **Node.js** (v22.x or above) ⚡
- **MongoDB Atlas** (or local MongoDB instance) 🗄️
- **Cloudinary Account** (for media storage) ☁️
- **Nodemailer-compatible Email Provider** (for OTP & verification links) 📧

---

## Installation ⚙️

### 1. Backend Setup 💻

```bash
git clone https://github.com/pprachhiii/chat-app.git
cd chat-app/backend
npm install
```

Create a `.env` file in the backend root 📝:

Start the backend:

```bash
npm start
```

Backend runs on: `http://localhost:5001` 🌐

---

### 2. Frontend Setup 💻

```bash
cd ../frontend
npm install
```

Create a `.env` file 📝:

```env
VITE_API_URL=http://localhost:5001/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173` 🌐

---

## Roadmap / Future Enhancements 🚀

- **Video Calling** (WebRTC) 📹
- **Voice Calling** 🎙️
- **Advanced File Sharing** 📂
- **Push Notifications** (FCM/OneSignal) 🔔
- **Message Search & Filters** 🔍
- **Admin Dashboard** (analytics, moderation) 📊
- **Multi-language support** 🌐

---

## License 📝

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details 📄.

---

## Contributing 🤝

Contributions are welcome! Please fork the repo, create a branch, and submit a pull request 🔄.

---

## Notes 📌

- Ensure MongoDB, Cloudinary, and Email provider credentials are properly set up ✅.
- Backend API must be running before the frontend to enable real-time messaging ⚡.
- Always configure `.env` properly for authentication and media services 🔐.
- Socket.IO is required for real-time chat and presence features 🌐.

---

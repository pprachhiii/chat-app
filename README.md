---
# Real-time One-to-One Chat App 💬

A **full-stack real-time chat application** built with **React**, **Express.js**, **Socket.IO**, and **MongoDB** 💻.

This app provides **secure username/password authentication**, **one-to-one messaging**, **media sharing**, **user presence**, and **profile management**, ready to deploy on platforms like Ender 🚀.
---

## Key Features 🔑

### Authentication & Security 🔐

- **Username & Password Login**: Secure login system.
- **Password Reset**: Manual reset using username (no email required).
- **Hashed Passwords**: Stored securely using bcrypt.
- **JWT Authentication**: Token-based access to protected APIs.
- **Account Protection**: Blocked users, login validation.

### User Features 👤

- **Profile Management**: username, full name, email, bio, and Cloudinary profile picture.
- **Update Profile**: bio, profile picture, and full name.
- **Contacts & Blocked Users**: Add contacts and block users.
- **User Status**: Track `online`, `offline`, `away`, `busy` and last seen.

### Messaging 💬

- **One-to-One Chats Only** 👥.
- **Multiple Message Types**: text, image, file, voice.
- **Message Status**: `sent`, `delivered`, `read`.
- **Advanced Messaging**: reply to messages, edit/delete messages.
- **Cloudinary Integration**: Store media files in Cloudinary, metadata in MongoDB.

### Real-time Functionality ⚡

- **Instant Messaging** powered by **Socket.IO**.
- **User Presence Tracking**: see who is online/offline.
- **Live Delivery/Read Receipts**.

### Frontend Experience 🎨

- **Private Routes** for authenticated users.
- **Toast Notifications** for system alerts and interactions.
- **Mini-profile Popups** in chat for contacts.

---

## Tech Stack 🛠️

- **Frontend**: React.js, React Router, Zustand, Lucide Icons, React Hot Toast.
- **Backend**: Express.js, Socket.IO, JWT, Bcrypt.js.
- **Database**: MongoDB (Mongoose ODM).
- **Media Storage**: Cloudinary ☁️.

---

## Installation ⚙️

```bash
git clone https://github.com/pprachhiii/chat-app.git
cd chat-app
```

### Backend Setup 💻

```bash
cd backend
npm install
```

Create a `.env` file in the backend root:

Start the backend:

```bash
npm run start
```

Backend runs on: `http://localhost:5001` (development)

---

### Frontend Setup 💻

```bash
cd ../frontend
npm install
```

Create a `.env` file:

Start the frontend:

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173` (development)

---

## Future Enhancements (Optional) 🔮

- Video Calling (WebRTC)
- Voice Calling
- Advanced File Sharing
- Push Notifications
- Message Search & Filters
- Admin Dashboard

---

## License 📝

Licensed under the MIT License. See the [LICENSE](LICENSE) file.

---

## Notes 📌

- Ensure MongoDB and Cloudinary credentials are set correctly.
- Backend must run before frontend for real-time messaging to work.

---

---

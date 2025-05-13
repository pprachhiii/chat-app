# Real-time Chat Application

This is a full-stack chat application built with **React** for the frontend, **Express.js** and **Socket.IO** for the backend, and **MongoDB** for data storage. The app supports user authentication, real-time messaging, and theme management.

## 🔑 Current Features

- **User Authentication**: Signup, login, and token-based authentication using **JWT**.
- **Real-time Messaging**: Real-time communication between users via **Socket.IO**.
- **MongoDB Integration**: Stores users and messages securely in a MongoDB database.
- **CORS Configuration**: Backend API allows CORS for communication with the frontend during development.
- **Theme Management**: Dynamic theme switching between dark and light modes.
- **Private Routes**: Certain routes (like Home and Profile) require the user to be logged in to access.
- **Toast Notifications**: Alerts and notifications using **react-hot-toast**.
- **User Presence**: Display the online status of users.

## 🛠 Tech Stack

- **Frontend**: React.js, React Router, Lucide Icons, React Hot Toast
- **Backend**: Express.js, Socket.IO, JWT for authentication
- **Database**: MongoDB
- **State Management**: Zustand for managing authentication and theme state

## 📋 Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (v22.x or above)
- **MongoDB Atlas** (or local MongoDB instance)

## ⚙️ Installation

### 1. Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/pprachhiii/chat-app.git
   cd chat-app/backend
   ```

2. **Install Backend Dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the backend root directory:

4. **Start the Backend Server**:

   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:5001`.

---

### 2. Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd ../frontend
   ```

2. **Install Frontend Dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** for your frontend configuration (optional):

   Example for API URL:

   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

4. **Start the Frontend Development Server**:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`.

---

## 🚀 Future Features

1. **Group Chat**: Allow users to create and join group chats for conversations with multiple participants.
2. **Video Calling**: Integrate video calling functionality using WebRTC or a similar technology for real-time video communication.
3. **Voice Calling**: Implement voice calling capabilities for users to communicate in real-time without text.
4. **File Sharing**: Allow users to share files, images, and documents in chats.
5. **Push Notifications**: Notify users of new messages and events even when they are not in the app.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository, create a branch, and open a pull request with your changes.

---

## 📌 Additional Notes

- Ensure MongoDB is properly set up (e.g., using MongoDB Atlas or a local MongoDB instance).
- The backend API must be running before the frontend is accessible for real-time messaging.
- Make sure that the `.env` file contains the correct values for the MongoDB URI and JWT secret.

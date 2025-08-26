import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const StartChatModal = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const { startChatByUsername } = useChatStore();

  const handleStartChat = async () => {
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }
    try {
      await startChatByUsername(username.trim());
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to start chat");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>
        <h3 className="text-lg font-medium mb-4">Start Chat</h3>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleStartChat}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default StartChatModal;

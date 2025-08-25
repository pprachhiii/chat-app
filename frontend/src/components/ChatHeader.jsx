import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedChat, setSelectedChat } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedChat) return null;

  // For one-on-one, selectedChat is always the other user
  const otherUser = selectedChat;
  const chatName = otherUser.fullName || otherUser.username;
  const chatAvatar = otherUser.profilePic || "/avatar.png";
  const isOnline = onlineUsers.includes(otherUser._id);

  return (
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between">
        {/* Left: Avatar + Info */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-md flex-shrink-0">
            <img
              src={chatAvatar}
              alt={chatName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Chat Info */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800">{chatName}</h3>
            <p
              className={`text-sm ${
                isOnline ? "text-green-500" : "text-gray-400"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedChat(null)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

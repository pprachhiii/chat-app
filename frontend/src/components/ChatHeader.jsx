import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedChat, setSelectedChat } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();

  if (!selectedChat) return null;

  // Determine chat display info
  let chatName = "";
  let chatAvatar = "/avatar.png";
  let isOnline = false;

  if (selectedChat.isGroup) {
    chatName = selectedChat.name || "Group Chat";
    chatAvatar = "/group-avatar.png";
  } else {
    // For 1-to-1 chat, find the other user
    const otherUser = selectedChat.participants.find(
      (u) => u._id !== authUser._id
    );
    if (otherUser) {
      chatName = otherUser.fullName || otherUser.username;
      chatAvatar = otherUser.profilePic || "/avatar.png";
      isOnline = onlineUsers.includes(otherUser._id);
    }
  }

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={chatAvatar} alt={chatName} />
            </div>
          </div>

          {/* Chat info */}
          <div>
            <h3 className="font-medium">{chatName}</h3>
            {!selectedChat.isGroup && (
              <p className="text-sm text-base-content/70">
                {isOnline ? "Online" : "Offline"}
              </p>
            )}
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedChat(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;

import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getChats, chats, selectedChat, setSelectedChat, isChatsLoading } =
    useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getChats();
  }, [getChats]);

  const filteredChats = showOnlineOnly
    ? chats.filter((chat) =>
        chat.isGroupChat
          ? true // groups always show
          : chat.users.some(
              (u) => u._id !== authUser._id && onlineUsers.includes(u._id)
            )
      )
    : chats;

  if (isChatsLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Chats</span>
        </div>

        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      {/* Chat list */}
      <div className="overflow-y-auto w-full py-3">
        {filteredChats.map((chat) => {
          const isGroup = chat.isGroupChat;
          const otherUser = !isGroup
            ? chat.users.find((u) => u._id !== authUser._id)
            : null;

          const profilePic = isGroup
            ? chat.chatImage || "/group.png"
            : otherUser?.profilePic || "/avatar.png";

          const name = isGroup ? chat.chatName : otherUser?.fullName;

          const isOnline =
            !isGroup && otherUser ? onlineUsers.includes(otherUser._id) : false;

          return (
            <button
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-base-300 transition-colors
                ${
                  selectedChat?._id === chat._id
                    ? "bg-base-300 ring-1 ring-base-300"
                    : ""
                }
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={profilePic}
                  alt={name}
                  className="size-12 object-cover rounded-full"
                />
                {!isGroup && isOnline && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              {/* Chat info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{name}</div>
                <div className="text-sm text-zinc-400">
                  {isGroup
                    ? `${chat.users.length} members`
                    : isOnline
                    ? "Online"
                    : "Offline"}
                </div>
              </div>
            </button>
          );
        })}

        {filteredChats.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No chats found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

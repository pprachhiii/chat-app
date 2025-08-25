import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getChats, chats, selectedChat, setSelectedChat, isChatsLoading } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getChats();
  }, [getChats]);

  if (isChatsLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full border-r border-gray-200 flex flex-col bg-white shadow-md rounded-r-2xl transition-all duration-300">
      {/* Header */}
      <div className="border-b border-gray-200 w-full p-5 flex items-center gap-2">
        <Users className="w-6 h-6 text-indigo-500" />
        <span className="font-semibold text-indigo-600">Chats</span>
      </div>

      {/* Chats List */}
      <div className="overflow-y-auto w-full py-3 flex-1">
        {chats.length > 0 ? (
          chats.map((chat) => {
            const otherUser = chat.users.find((u) => u._id !== authUser._id);
            const profilePic = otherUser?.profilePic?.url || "/avatar.png";
            const name = otherUser?.fullName || otherUser?.username;

            return (
              <button
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full p-3 flex items-center gap-3 rounded-xl hover:bg-indigo-50 transition-colors duration-200 ${
                  selectedChat?._id === chat._id
                    ? "bg-indigo-100 ring-2 ring-indigo-200"
                    : ""
                }`}
              >
                <img
                  src={profilePic}
                  alt={name}
                  className="w-12 h-12 object-cover rounded-full shadow-sm"
                />
                <div className="text-left min-w-0 hidden lg:block">
                  <div className="font-medium truncate text-gray-800">
                    {name}
                  </div>
                  <div className="text-sm text-gray-400">Chat</div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="text-center text-gray-400 py-4">
            No chats started yet. Start a new chat to begin!
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

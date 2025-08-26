import { useEffect, useState } from "react";
import { Users, Plus } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import StartChatModal from "./StartChatModal";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isStartChatOpen, setIsStartChatOpen] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full border-r border-gray-200 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 w-full p-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-gray-600" />
            <span className="font-medium text-gray-700">Contacts</span>
          </div>

          {/* Start Chat Button */}
          <button
            onClick={() => setIsStartChatOpen(true)}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <Plus className="w-5 h-5 text-blue-500" />
          </button>
        </div>

        {/* Online filter toggle */}
        <div className="mt-3 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Show online only</span>
          </label>
          <span className="text-xs text-gray-400">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-3 flex-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 rounded-lg transition-colors duration-200
              ${
                selectedUser?._id === user._id
                  ? "bg-blue-100 ring-1 ring-blue-300"
                  : "hover:bg-gray-100"
              }`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="w-12 h-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                  rounded-full ring-2 ring-white"
                />
              )}
            </div>

            <div className="text-left min-w-0">
              <div className="font-medium truncate text-gray-700">
                {user.fullName}
              </div>
              <div className="text-sm text-gray-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-400 py-4">No online users</div>
        )}
      </div>

      {isStartChatOpen && (
        <StartChatModal onClose={() => setIsStartChatOpen(false)} />
      )}
    </aside>
  );
};

export default Sidebar;

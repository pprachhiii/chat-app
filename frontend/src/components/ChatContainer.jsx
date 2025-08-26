import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    editMessage,
    deleteMessage,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [menuOpenMessageId, setMenuOpenMessageId] = useState(null);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (!selectedUser) return;
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  const handleEditSave = (messageId) => {
    if (!editingText.trim()) return;
    editMessage(messageId, { text: editingText });
    setEditingMessageId(null);
    setEditingText("");
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          // Compare IDs safely even if senderId is populated
          const messageSenderId = message.senderId?._id || message.senderId;
          const isAuthUser = String(messageSenderId) === String(authUser._id);

          const isEditing = editingMessageId === message._id;
          const isMenuOpen = menuOpenMessageId === message._id;

          return (
            <div
              key={message._id}
              className={`flex items-end gap-3 ${
                isAuthUser ? "justify-end" : "justify-start"
              }`}
              ref={messageEndRef}
            >
              {/* Avatar for other user */}
              {!isAuthUser && (
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={selectedUser?.profilePic?.url || "/avatar.png"}
                    alt={selectedUser?.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col max-w-xs sm:max-w-md relative">
                <time className="text-xs text-gray-400 mb-1">
                  {formatMessageTime(message.createdAt)}
                </time>

                {/* Message bubble */}
                <div
                  className={`flex flex-col p-3 rounded-2xl break-words ${
                    isAuthUser
                      ? "bg-blue-500 text-white self-end"
                      : "bg-white text-gray-800 shadow"
                  }`}
                >
                  {message.fileUrl && (
                    <img
                      src={message.fileUrl}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}

                  {isEditing ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className={`p-1 border-none flex-1 ${
                          isAuthUser ? "bg-blue-500 text-white" : "bg-gray-100"
                        }`}
                      />
                      <button
                        onClick={() => handleEditSave(message._id)}
                        className="text-sm text-black"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingMessageId(null)}
                        className="text-sm text-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p>{message.text}</p>
                  )}
                </div>

                {/* 3-dot menu for auth user */}
                {isAuthUser && !isEditing && (
                  <div className="absolute top-0 right-0">
                    <button
                      onClick={() =>
                        setMenuOpenMessageId(isMenuOpen ? null : message._id)
                      }
                      className="text-gray-400 hover:text-gray-700 px-2"
                    >
                      ⋮
                    </button>
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 bg-white shadow rounded border w-24 z-10">
                        <button
                          onClick={() => {
                            setEditingMessageId(message._id);
                            setEditingText(message.text);
                            setMenuOpenMessageId(null);
                          }}
                          className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteMessage(message._id);
                            setMenuOpenMessageId(null);
                          }}
                          className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Avatar for auth user */}
              {isAuthUser && (
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={authUser?.profilePic?.url || "/avatar.png"}
                    alt={authUser?.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

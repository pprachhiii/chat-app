import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

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
    selectedChat,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedChat?._id) {
      getMessages(selectedChat._id); // fetch messages with this user
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [
    selectedChat?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId._id === authUser._id;

          return (
            <div
              key={message._id}
              ref={messageEndRef}
              className={`flex flex-col ${
                isOwnMessage ? "items-end" : "items-start"
              }`}
            >
              {/* Avatar */}
              <div className="flex items-center mb-1 gap-2">
                {!isOwnMessage && (
                  <div className="w-10 h-10 rounded-full overflow-hidden shadow-md flex-shrink-0">
                    <img
                      src={message.senderId.profilePic || "/avatar.png"}
                      alt={message.senderId.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col text-sm">
                  <span className="font-medium text-gray-800">
                    {isOwnMessage ? "You" : message.senderId.username}
                  </span>
                  <time className="text-xs text-gray-400">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>

                {isOwnMessage && (
                  <div className="w-10 h-10 rounded-full overflow-hidden shadow-md flex-shrink-0">
                    <img
                      src={authUser.profilePic || "/avatar.png"}
                      alt="You"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Message bubble */}
              <div
                className={`max-w-[70%] p-3 rounded-2xl shadow-md text-gray-800 break-words ${
                  isOwnMessage
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white rounded-bl-none"
                }`}
              >
                {message.isDeleted ? (
                  <p className="italic text-gray-400">
                    This message was deleted
                  </p>
                ) : (
                  <>
                    {message.messageType === "image" && message.fileUrl && (
                      <img
                        src={message.fileUrl}
                        alt="Attachment"
                        className="rounded-md mb-2 max-w-full"
                      />
                    )}
                    {message.messageType === "file" && message.fileUrl && (
                      <a
                        href={message.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline mb-2 block"
                      >
                        📎 Download File
                      </a>
                    )}
                    {message.messageType === "voice" && message.fileUrl && (
                      <audio controls className="mb-2 w-full">
                        <source src={message.fileUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                    {message.text && (
                      <p>
                        {message.text}
                        {message.isEdited && (
                          <span className="ml-1 text-xs text-gray-400">
                            (edited)
                          </span>
                        )}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

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
      getMessages(selectedChat._id);
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
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      isOwnMessage
                        ? authUser.profilePic || "/avatar.png"
                        : message.sender?.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>

              <div className="chat-header mb-1 flex items-center gap-2">
                <span className="text-sm font-medium">
                  {isOwnMessage ? "You" : message.sender?.username}
                </span>
                <time className="text-xs opacity-50">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              <div className="chat-bubble flex flex-col">
                {/* Deleted message */}
                {message.isDeleted ? (
                  <p className="italic text-gray-400">
                    This message was deleted
                  </p>
                ) : (
                  <>
                    {/* File / Image / Voice */}
                    {message.messageType === "image" && message.fileUrl && (
                      <img
                        src={message.fileUrl}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md mb-2"
                      />
                    )}

                    {message.messageType === "file" && message.fileUrl && (
                      <a
                        href={message.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline mb-2"
                      >
                        📎 Download File
                      </a>
                    )}

                    {message.messageType === "voice" && message.fileUrl && (
                      <audio controls className="mb-2">
                        <source src={message.fileUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}

                    {/* Text */}
                    {message.text && (
                      <p>
                        {message.text}
                        {message.isEdited && (
                          <span className="ml-1 text-xs opacity-50">
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

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedChat } = useChatStore();

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50">
      {/* Left Sidebar/Chat Section */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-10">
          {/* Header */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center shadow-lg 
                transition-transform duration-300 hover:scale-105 hover:bg-blue-500 group"
              >
                <span className="text-blue-500 text-2xl font-bold group-hover:text-white">
                  💬
                </span>
              </div>
              <h1 className="text-3xl font-extrabold mt-2 text-gray-800">
                Welcome Back!
              </h1>
              <p className="text-gray-600 max-w-xs">
                Select a chat or start a new conversation.
              </p>
            </div>
          </div>

          {/* Chat/NoChat Display */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-[400px] overflow-auto">
            {!selectedChat ? (
              <div className="flex items-center justify-center h-full text-center p-8">
                <NoChatSelected message="Select a chat to start a conversation! 🌟" />
              </div>
            ) : (
              <ChatContainer />
            )}
          </div>
        </div>
      </div>

      {/* Right Illustration / Decorative Section */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Stay Connected!
          </h2>
          <p className="text-gray-600 max-w-sm">
            Your conversations, all in one place. Explore, chat, and share your
            thoughts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

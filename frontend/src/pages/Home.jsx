import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedChat } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-yellow-50">
      {/* Optional top-right auth/login placeholder */}
      <div className="absolute top-4 right-8">
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition">
          Login / Signup
        </button>
      </div>

      <div className="flex items-center justify-center py-12 px-6">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)] overflow-hidden">
          <div className="flex h-full rounded-2xl overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Chat area */}
            <div className="flex-1 flex flex-col bg-white">
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
      </div>
    </div>
  );
};

export default HomePage;

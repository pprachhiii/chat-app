import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedChat } = useChatStore();

  return (
    // Adjust height to subtract navbar height (4rem)
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-[40%_60%] bg-gray-50">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Chat Pane */}
      <div className="rounded-2xl shadow-md p-6 flex-1">
        {!selectedChat ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
};

export default HomePage;

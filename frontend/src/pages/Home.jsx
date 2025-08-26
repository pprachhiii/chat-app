import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gray-50">
      <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
        {/* Sidebar: 40% width */}
        <div className="w-2/5 h-full">
          <Sidebar />
        </div>

        {/* Chat area: 60% width */}
        <div className="w-3/5 h-full">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

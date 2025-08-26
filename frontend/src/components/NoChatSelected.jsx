import { MessageSquare, Plus } from "lucide-react";
import { useState } from "react";
import StartChatModal from "./StartChatModal";

const NoChatSelected = () => {
  const [isStartChatOpen, setIsStartChatOpen] = useState(false);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-16 bg-gray-50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center animate-bounce">
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">Welcome!</h2>
        <p className="text-gray-500">
          Select a conversation from the sidebar or start a new chat
        </p>

        <button
          onClick={() => setIsStartChatOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Start Chat
        </button>

        {isStartChatOpen && (
          <StartChatModal onClose={() => setIsStartChatOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default NoChatSelected;

import { MessageSquare, Plus } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const NoChatSelected = () => {
  const { setSelectedChat } = useChatStore();

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>

        {/* (Optional) Start Chat Button */}
        <button
          className="btn btn-primary mt-4 flex items-center gap-2"
          onClick={() => setSelectedChat(null)} // could open a modal or search instead
        >
          <Plus size={18} /> Start a new chat
        </button>
      </div>
    </div>
  );
};

export default NoChatSelected;

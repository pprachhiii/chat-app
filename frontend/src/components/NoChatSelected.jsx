import { MessageSquare, Plus } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const NoChatSelected = () => {
  const { addChatIfNotExists } = useChatStore();

  const startNewChat = async () => {
    const username = prompt("Enter the username you want to chat with:");
    if (!username) return;

    try {
      const res = await fetch(`/api/users/find?username=${username}`);
      const user = await res.json();

      if (!user?._id) return alert("User not found!");

      const newChat = {
        _id: Date.now().toString(),
        users: [user],
      };

      addChatIfNotExists(newChat);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-3xl bg-white shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-105">
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-800">Welcome!</h2>
        <p className="text-gray-600">
          Select a conversation from the sidebar to start chatting
        </p>

        <button
          onClick={startNewChat}
          className="mt-4 w-full py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Start a new chat
        </button>
      </div>
    </div>
  );
};

export default NoChatSelected;

import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Paperclip, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, selectedChat } = useChatStore();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) setFileType("image");
    else if (file.type.startsWith("audio/")) setFileType("voice");
    else setFileType("file");

    const reader = new FileReader();
    reader.onloadend = () => setFilePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setFilePreview(null);
    setFileType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !filePreview) return;

    if (!selectedChat?._id) {
      toast.error("No chat selected");
      return;
    }

    try {
      await sendMessage(selectedChat._id, {
        text: text.trim(),
        messageType: fileType || "text",
        fileUrl: filePreview || null,
      });
      setText("");
      removeFile();
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-4 w-full bg-gray-50">
      {/* File preview */}
      {filePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            {fileType === "image" && (
              <img
                src={filePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-gray-300"
              />
            )}
            {fileType === "voice" && (
              <audio controls className="w-40">
                <source src={filePreview} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            {fileType === "file" && (
              <div className="p-2 border rounded-lg bg-gray-100 text-gray-700">
                📎 File selected
              </div>
            )}
            <button
              onClick={removeFile}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-300 transition"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          {/* File upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex w-10 h-10 rounded-full items-center justify-center shadow-sm transition-colors ${
              filePreview
                ? "text-emerald-500 hover:bg-emerald-100"
                : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            <Paperclip size={20} />
          </button>
        </div>

        {/* Send button */}
        <button
          type="submit"
          disabled={!text.trim() && !filePreview}
          className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex justify-center items-start bg-gray-50 py-12 px-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Preview Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Preview</h3>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  J
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-800">
                    John Doe
                  </h3>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-white">
              {PREVIEW_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isSent ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                      message.isSent
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-[10px] mt-1.5 ${
                        message.isSent ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      12:00 PM
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 bg-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Type a message..."
                  value="This is a preview"
                  readOnly
                />
                <button className="px-4 py-2 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition-shadow shadow-md flex items-center justify-center">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;

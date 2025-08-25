const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);
  const widths = ["w-[120px]", "w-[180px]", "w-[220px]", "w-[160px]"];
  const heights = ["h-6", "h-10", "h-16"];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {skeletonMessages.map((_, idx) => {
        const isOwnMessage = idx % 2 !== 0;
        return (
          <div
            key={idx}
            className={`flex flex-col ${
              isOwnMessage ? "items-end" : "items-start"
            } space-y-1`}
          >
            {/* Avatar */}
            <div className="flex items-center mb-1 gap-2">
              {!isOwnMessage && (
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <div className="w-full h-full rounded-full animate-pulse bg-gray-300" />
                </div>
              )}

              {isOwnMessage && (
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <div className="w-full h-full rounded-full animate-pulse bg-gray-300" />
                </div>
              )}
            </div>

            {/* Message bubble */}
            <div
              className={`max-w-[70%] rounded-2xl p-3 shadow-md ${
                isOwnMessage ? "bg-blue-500" : "bg-white"
              }`}
            >
              <div
                className={`animate-pulse rounded ${
                  heights[idx % heights.length]
                } ${widths[idx % widths.length]}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;

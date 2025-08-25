const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);
  const widths = ["w-[120px]", "w-[180px]", "w-[220px]", "w-[160px]"];
  const heights = ["h-6", "h-10", "h-16"];

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              <div className="skeleton w-full h-full rounded-full animate-pulse" />
            </div>
          </div>

          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-16 animate-pulse" />
          </div>

          <div className="chat-bubble bg-transparent p-0">
            <div
              className={`skeleton ${heights[idx % heights.length]} ${
                widths[idx % widths.length]
              } animate-pulse`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {skeletonMessages.map((_, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`flex items-end gap-3 ${
              isEven ? "justify-start" : "justify-end"
            } animate-pulse`}
          >
            {/* Avatar */}
            {!isEven && <div className="w-10 h-10 rounded-full bg-gray-200" />}

            <div className="flex flex-col max-w-xs sm:max-w-md">
              {/* Timestamp */}
              <div className="h-4 w-16 bg-gray-200 rounded mb-1" />

              {/* Message bubble */}
              <div
                className={`p-3 rounded-2xl break-words ${
                  isEven ? "bg-gray-200" : "bg-gray-300"
                }`}
              >
                <div className="h-16 w-[200px] rounded-md bg-gray-300" />
              </div>
            </div>

            {/* Avatar for right side */}
            {isEven && <div className="w-10 h-10 rounded-full bg-gray-200" />}
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;

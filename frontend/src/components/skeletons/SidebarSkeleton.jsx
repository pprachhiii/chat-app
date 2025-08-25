import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);
  const nameWidths = ["w-20", "w-24", "w-28", "w-32"];
  const statusWidths = ["w-12", "w-14", "w-16"];

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
      flex flex-col transition-all duration-200"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full animate-pulse" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div
                className={`skeleton h-4 mb-2 animate-pulse ${
                  nameWidths[idx % nameWidths.length]
                }`}
              />
              <div
                className={`skeleton h-3 animate-pulse ${
                  statusWidths[idx % statusWidths.length]
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;

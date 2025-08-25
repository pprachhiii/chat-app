import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);
  const nameWidths = ["w-20", "w-24", "w-28", "w-32"];
  const statusWidths = ["w-12", "w-14", "w-16"];

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-200 flex flex-col transition-all duration-200 bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-gray-600" />
          <span className="font-medium hidden lg:block text-gray-800">
            Contacts
          </span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0">
              <div className="w-full h-full rounded-full animate-pulse bg-gray-300" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:flex flex-col text-left min-w-0 flex-1 gap-2">
              <div
                className={`h-4 bg-gray-300 rounded animate-pulse ${
                  nameWidths[idx % nameWidths.length]
                }`}
              />
              <div
                className={`h-3 bg-gray-300 rounded animate-pulse ${
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

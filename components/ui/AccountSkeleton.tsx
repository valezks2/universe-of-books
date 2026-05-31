// components/ui/AccountSkeleton.tsx
export function AccountSkeleton() {
  return (
    <div className="w-full max-w-4xl bg-white dark:bg-[#1a1a1a] rounded-2xl border border-[#ededed] dark:border-[#333] flex flex-col md:flex-row overflow-hidden animate-pulse h-[600px]">
      {/* Sidebar Skeleton */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-[#ededed] dark:border-[#333] bg-[#fcfcfc] dark:bg-[#1e1e1e] p-6 space-y-6">
        <div className="h-6 bg-gray-200 dark:bg-[#333] rounded w-20" />
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 dark:bg-[#333] rounded-xl" />
          <div className="h-10 bg-gray-200 dark:bg-[#333] rounded-xl" />
        </div>
      </div>
      {/* Content Skeleton */}
      <div className="flex-1 p-12 space-y-8">
        <div className="h-8 bg-gray-200 dark:bg-[#333] rounded w-1/3 mx-auto" />
        <div className="space-y-4 max-w-md">
          <div className="h-12 bg-gray-200 dark:bg-[#333] rounded-xl" />
          <div className="h-12 bg-gray-200 dark:bg-[#333] rounded-xl" />
        </div>
      </div>
    </div>
  );
}

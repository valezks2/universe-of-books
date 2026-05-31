export function FavoritesSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between p-5 bg-white dark:bg-[#1a1a1a] border border-[#ededed] dark:border-[#333] rounded-2xl animate-pulse"
        >
          <div className="flex items-start gap-4 w-full">
            <div className="w-10 h-10 bg-gray-200 dark:bg-[#333] rounded-full flex-shrink-0" />
            <div className="space-y-2 w-full">
              <div className="h-5 bg-gray-200 dark:bg-[#333] rounded w-1/2" />
              <div className="h-4 bg-gray-200 dark:bg-[#333] rounded w-1/4" />
              <div className="h-8 bg-gray-200 dark:bg-[#333] rounded w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

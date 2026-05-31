export function ChatSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto p-5 animate-pulse space-y-4 flex flex-col items-center">
      <div className="h-8 bg-gray-200 dark:bg-[#333] rounded w-1/3" />
      <div className="h-4 bg-gray-200 dark:bg-[#333] rounded w-1/2" />

      <div className="h-20 bg-gray-200 dark:bg-[#333] rounded-xl w-full mt-6" />
    </div>
  );
}

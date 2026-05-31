import { Suspense } from "react";
import AuthManager from "../providers/AuthProvider";
import { ChatSkeleton } from "@/components/ui/ChatSkeleton";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white dark:bg-[#111] flex items-center justify-center">
          <ChatSkeleton />
        </div>
      }
    >
      <AuthManager />
    </Suspense>
  );
}

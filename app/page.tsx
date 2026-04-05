import { Suspense } from "react";
import AuthManager from "../providers/AuthProvider";

export default function Home() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-white dark:bg-[#111]" />}
    >
      <AuthManager />
    </Suspense>
  );
}

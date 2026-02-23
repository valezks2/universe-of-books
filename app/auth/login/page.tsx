"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim()) {
      setErrorMsg("Please enter your email.");
      return;
    }

    if (!password) {
      setErrorMsg("Please enter your password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg("Invalid email or password.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 text-[#222]">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#ededed] p-8">

        <div className="text-center mb-8">
          <h1 className="font-poppins text-2xl font-medium text-[#212529] mb-2 tracking-tight">
            Log In
          </h1>
          <p className="text-[#666] text-[0.98em]">
            Log in to see your favorite books
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block text-[0.9em] text-[#555] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full rounded-xl border border-[#ddd] px-4 py-3 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] focus:border-[#ccc]"
              required
            />
          </div>

          <div>
            <label className="block text-[0.9em] text-[#555] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#ddd] px-4 py-3 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] focus:border-[#ccc]"
              required
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{errorMsg}</p>
          )}

          <div className="flex items-center justify-between text-[0.9em]">
            <label className="flex items-center gap-2 text-[#555] cursor-pointer">
              <input type="checkbox" className="rounded border-[#ccc]" />
              Remember me
            </label>

            <Link
              href="/auth/forgot-password"
              className="text-[#666] hover:text-[#333] transition"
            >
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e7e7e7] text-[#222] rounded-full py-3 text-[0.97em] font-medium transition hover:bg-[#d3d3d3] hover:text-[#181818] cursor-pointer"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center mt-6 text-[0.95em] text-[#666]">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-[#222] font-medium hover:underline">
            Sign up for free
          </Link>
        </p>
      </div>
    </main>
  );
}
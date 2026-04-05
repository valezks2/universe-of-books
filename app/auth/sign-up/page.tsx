"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

export default function RegisterPage() {
  const supabase = createClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg("The name cannot be empty.");
      return;
    }

    if (!email.trim()) {
      setErrorMsg("Please enter your email.");
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,\-_])(?=.{8,})/;

    if (!strongPasswordRegex.test(password)) {
      setErrorMsg(
        "The password must have at least 8 characters, including uppercase, lowercase, a number and a symbol.",
      );
      return;
    }

    if (!acceptedPolicy) {
      setErrorMsg("You must accept the Privacy Policy to continue.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg("Something went wrong. Please try again later.");
      return;
    }

    if (user) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#111] flex items-center justify-center px-4 py-11 text-[#222] dark:text-[#eee] transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-[#1a1a1a] rounded-2xl border border-[#ededed] dark:border-[#333] p-8">
        <div className="text-center mb-8">
          <h1 className="font-poppins text-2xl font-medium text-[#212529] dark:text-white mb-2 tracking-tight">
            Create your account
          </h1>
          <p className="text-[#666] dark:text-[#aaa] text-[0.98em]">
            Sign up to use our chatbot
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block text-[0.9em] text-[#555] dark:text-[#ccc] mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-transparent rounded-xl border border-[#ddd] dark:border-[#444] px-4 py-3 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] dark:focus:ring-[#333] focus:border-[#ccc] dark:focus:border-[#555] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[0.9em] text-[#555] dark:text-[#ccc] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full bg-transparent rounded-xl border border-[#ddd] dark:border-[#444] px-4 py-3 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] dark:focus:ring-[#333] focus:border-[#ccc] dark:focus:border-[#555] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[0.9em] text-[#555] dark:text-[#ccc] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent rounded-xl border border-[#ddd] dark:border-[#444] px-4 py-3 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] dark:focus:ring-[#333] focus:border-[#ccc] dark:focus:border-[#555] transition-all"
              required
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
              {errorMsg}
            </p>
          )}

          <label className="flex items-start gap-2 text-[0.9em] text-[#666] dark:text-[#aaa] cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 rounded border-[#ccc] dark:border-[#555] bg-transparent"
              checked={acceptedPolicy}
              onChange={(e) => setAcceptedPolicy(e.target.checked)}
              required
            />
            <span>
              By creating an account, I acknowledge that I have read and
              understood the{" "}
              <Link
                href="/privacy-policy"
                className="text-[#222] dark:text-white font-medium hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e7e7e7] dark:bg-[#252525] text-[#222] dark:text-[#eee] rounded-full py-3 text-[0.97em] font-medium transition hover:bg-[#d3d3d3] dark:hover:bg-[#333] hover:text-[#181818] dark:hover:text-white cursor-pointer disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center mt-6 text-[0.95em] text-[#666] dark:text-[#888]">
          Do you already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#222] dark:text-white font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}

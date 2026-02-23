"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg("Please enter your email.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setSuccessMsg("Check your email for the reset link!");
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 text-[#222]">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#ededed] p-8">
        
        <div className="text-center mb-8">
          <h1 className="font-poppins text-2xl font-medium text-[#212529] mb-2 tracking-tight">
            Forgot Password
          </h1>
          <p className="text-[#666] text-[0.98em]">
            Enter your email to receive a reset link
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

          {errorMsg && (
            <p className="text-xs text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
              {errorMsg}
            </p>
          )}

          {successMsg && (
            <p className="text-xs text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
              {successMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e7e7e7] text-[#222] rounded-full py-3 text-[0.97em] font-medium transition hover:bg-[#d3d3d3] hover:text-[#181818] cursor-pointer"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center mt-6 text-[0.95em] text-[#666]">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-[#222] font-medium hover:underline">
            Go back to login
          </Link>
        </p>
      </div>
    </main>
  );
}
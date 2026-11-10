"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, ArrowLeft } from "lucide-react";

import { resetPassword } from "@/features/auth/services/reset-password";
import { GradientMesh } from "@/components/animations/gradient-mesh";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await resetPassword(email);
      setSent(true);
    } catch (err: any) {
      setError(
        err?.code === "auth/user-not-found"
          ? "No account found with that email."
          : "We couldn't send the reset email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <GradientMesh />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-semibold tracking-tight text-white">
            <img src="/logo.png" alt="TIIF" className="h-9 w-9 rounded-lg" />
            TIIF
          </Link>
          <p className="mt-2 text-sm text-slate-400">
            {sent ? "Check your inbox." : "Reset your password."}
          </p>
        </div>

        {sent ? (
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl">
            <p className="text-sm leading-6 text-slate-300">
              If an account exists for <span className="text-white">{email}</span>, a
              password reset link is on its way.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-navy-400 hover:text-navy-300"
            >
              <ArrowLeft size={14} /> Back to sign in
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
          >
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Email
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 focus-within:border-navy-400/50">
                <Mail size={16} className="text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-rose-500/10 px-4 py-2 text-sm text-rose-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-navy-500 px-6 py-3 font-medium text-white transition hover:bg-navy-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <>Send reset link <ArrowRight size={16} /></>}
            </button>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-slate-300"
            >
              <ArrowLeft size={14} /> Back to sign in
            </Link>
          </form>
        )}
      </motion.div>
    </div>
  );
}

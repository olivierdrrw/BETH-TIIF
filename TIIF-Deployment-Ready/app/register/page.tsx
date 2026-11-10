"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

import { registerUser } from "@/features/auth/services/register";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { GradientMesh } from "@/components/animations/gradient-mesh";
import { SocialLoginButtons } from "@/features/auth/components/social-login-buttons";

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const credential = await registerUser(email, password);
      setUser(credential.user);
      router.push("/onboarding");
    } catch (err: any) {
      setError(
        err?.code === "auth/email-already-in-use"
          ? "An account with this email already exists."
          : "We couldn't create your account. Please try again."
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
            Create your account and meet your Human Twin.
          </p>
        </div>

        <form
          onSubmit={handleRegister}
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

          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 focus-within:border-navy-400/50">
              <Lock size={16} className="text-slate-500" />
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                Create account <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6">
          <SocialLoginButtons />
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-navy-400 hover:text-navy-300">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

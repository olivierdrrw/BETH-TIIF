"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

import { loginUser } from "@/features/auth/services/login";
import {
  startTwoFactorChallenge,
  confirmTwoFactorChallenge,
  type MultiFactorResolver,
} from "@/features/auth/services/two-factor";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { GradientMesh } from "@/components/animations/gradient-mesh";
import { SocialLoginButtons } from "@/features/auth/components/social-login-buttons";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2FA challenge state
  const [mfaResolver, setMfaResolver] = useState<MultiFactorResolver | null>(null);
  const [mfaVerificationId, setMfaVerificationId] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const credential = await loginUser(email, password, rememberMe);
      setUser(credential.user);
      router.push("/dashboard");
    } catch (err: any) {
      if (err?.code === "auth/multi-factor-auth-required" && err.mfaResolver) {
        setMfaResolver(err.mfaResolver);
        try {
          const verificationId = await startTwoFactorChallenge(
            err.mfaResolver,
            "recaptcha-container"
          );
          setMfaVerificationId(verificationId);
        } catch {
          setError("Couldn't send your verification code. Please try again.");
        }
      } else {
        setError(
          err?.code === "auth/invalid-credential"
            ? "That email and password don't match."
            : "We couldn't sign you in. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerify2FA(e: React.FormEvent) {
    e.preventDefault();
    if (!mfaResolver || !mfaVerificationId) return;

    setError(null);
    setIsLoading(true);

    try {
      const credential = await confirmTwoFactorChallenge(mfaResolver, mfaVerificationId, mfaCode);
      setUser(credential.user);
      router.push("/dashboard");
    } catch {
      setError("That code wasn't right. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <GradientMesh />
      <div id="recaptcha-container" />

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
            {mfaResolver ? "Enter the code we texted you." : "Welcome back — let's continue your journey."}
          </p>
        </div>

        {mfaResolver ? (
          <form
            onSubmit={handleVerify2FA}
            className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
          >
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Verification code
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 focus-within:border-navy-400/50">
                <ShieldCheck size={16} className="text-slate-500" />
                <input
                  inputMode="numeric"
                  required
                  placeholder="123456"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  className="w-full bg-transparent text-sm tracking-widest text-white placeholder:text-slate-600 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-rose-500/10 px-4 py-2 text-sm text-rose-300">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || mfaCode.length < 6}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-navy-500 px-6 py-3 font-medium text-white transition hover:bg-navy-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Verify & sign in"}
            </button>
          </form>
        ) : (
          <>
            <form
              onSubmit={handleLogin}
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
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-navy-400 hover:text-navy-300">
                    Forgot password?
                  </Link>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 focus-within:border-navy-400/50">
                  <Lock size={16} className="text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
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

              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 accent-navy-500"
                />
                Remember me
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-navy-500 px-6 py-3 font-medium text-white transition hover:bg-navy-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Sign in <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6">
              <SocialLoginButtons />
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-navy-400 hover:text-navy-300">
                Create one
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import {
  loginWithGoogle,
  loginWithGithub,
  loginWithFacebook,
  loginWithApple,
} from "@/features/auth/services/social-login";

const PROVIDERS = [
  { id: "google", label: "Google", action: loginWithGoogle, icon: "/icons/google.png" },
  { id: "github", label: "GitHub", action: loginWithGithub, icon: "/icons/github.png" },
  { id: "facebook", label: "Facebook", action: loginWithFacebook, icon: "/icons/facebook.png" },
  { id: "apple", label: "Apple", action: loginWithApple, icon: null },
];

function AppleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 384 512" fill="currentColor" className="shrink-0">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  );
}

export function SocialLoginButtons() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClick(id: string, action: () => Promise<any>) {
    setError(null);
    setLoadingId(id);
    try {
      const credential = await action();
      setUser(credential.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err?.code === "auth/operation-not-allowed"
          ? "This sign-in method isn't enabled yet."
          : "Sign-in was cancelled or failed."
      );
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-xs text-slate-600">
        <div className="h-px flex-1 bg-white/10" />
        or continue with
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PROVIDERS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleClick(p.id, p.action)}
            disabled={loadingId !== null}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
          >
            {loadingId === p.id ? (
              <Loader2 size={14} className="animate-spin" />
            ) : p.icon ? (
              <img src={p.icon} alt="" className="h-4 w-4 shrink-0 object-contain" />
            ) : (
              <AppleMark />
            )}
            {p.label}
          </button>
        ))}
      </div>

      {error && <p className="text-center text-xs text-rose-300">{error}</p>}
    </div>
  );
}

"use client";

import { useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import {
  startPhoneEnrollment,
  confirmPhoneEnrollment,
  isTwoFactorEnabled,
} from "@/features/auth/services/two-factor";

export function TwoFactorSettings() {
  const user = useAuthStore((state) => state.user);
  const [enabled, setEnabled] = useState(() => isTwoFactorEnabled(user));
  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSendCode() {
    if (!user || !phone.trim()) return;
    setError(null);
    setIsLoading(true);
    try {
      const id = await startPhoneEnrollment(user, phone.trim(), "recaptcha-container-2fa");
      setVerificationId(id);
    } catch (err: any) {
      setError(err?.message ?? "Couldn't send the verification code.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleConfirm() {
    if (!user || !verificationId || !code.trim()) return;
    setError(null);
    setIsLoading(true);
    try {
      await confirmPhoneEnrollment(user, verificationId, code.trim());
      setEnabled(true);
      setVerificationId(null);
      setPhone("");
      setCode("");
    } catch {
      setError("That code wasn't right. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center gap-2">
        <ShieldCheck size={16} className={enabled ? "text-navy-400" : "text-slate-500"} />
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Two-Factor Authentication
        </h2>
      </div>

      <div id="recaptcha-container-2fa" />

      {enabled ? (
        <p className="text-sm text-navy-300">
          Two-factor authentication is enabled on your account.
        </p>
      ) : verificationId ? (
        <div className="space-y-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter the 6-digit code"
            className="input"
          />
          <button
            onClick={handleConfirm}
            disabled={isLoading || !code.trim()}
            className="flex items-center gap-2 rounded-xl bg-navy-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-400 disabled:opacity-50"
          >
            {isLoading && <Loader2 size={14} className="animate-spin" />}
            Confirm code
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-slate-400">
            Add your phone number to require a text-message code at sign-in.
          </p>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 000 0000"
            className="input"
          />
          <button
            onClick={handleSendCode}
            disabled={isLoading || !phone.trim()}
            className="flex items-center gap-2 rounded-xl bg-navy-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-400 disabled:opacity-50"
          >
            {isLoading && <Loader2 size={14} className="animate-spin" />}
            Send verification code
          </button>
        </div>
      )}

      {error && <p className="text-sm text-rose-300">{error}</p>}
    </section>
  );
}

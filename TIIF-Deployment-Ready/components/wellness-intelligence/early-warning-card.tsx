"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { JournalRepository } from "@/features/journal/journal-repository";
import { extractFromJournal } from "@/lib/memory/memory-extractor";
import { detectRiskSignal } from "@/lib/memory/risk-detector";

export function EarlyWarningCard() {
  const user = useAuthStore((state) => state.user);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
    JournalRepository.getByUser(user.uid).then((entries) => {
      setElevated(detectRiskSignal(extractFromJournal(entries)).elevated);
    });
  }, [user?.uid]);

  return (
    <div
      className={`rounded-3xl border p-6 ${
        elevated ? "border-rose-400/30 bg-rose-500/5" : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <div className="flex items-center gap-2">
        {elevated ? (
          <AlertTriangle size={18} className="text-rose-300" />
        ) : (
          <ShieldCheck size={18} className="text-navy-300" />
        )}
        <h3 className="font-semibold text-white">Early Warning</h3>
      </div>

      <p className="mt-4 text-slate-400">
        {elevated
          ? "A pattern of difficult entries has been detected. It may help to talk to someone or book a therapy session."
          : "No early warning signs detected — keep up your check-ins."}
      </p>
    </div>
  );
}

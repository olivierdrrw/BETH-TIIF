"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { JournalRepository } from "@/features/journal/journal-repository";
import { extractFromJournal } from "@/lib/memory/memory-extractor";
import { detectRiskSignal } from "@/lib/memory/risk-detector";

export function RiskSignalsCard() {
  const user = useAuthStore((state) => state.user);
  const [signal, setSignal] = useState<{ elevated: boolean; recentDifficultCount: number } | null>(null);

  useEffect(() => {
    if (!user?.uid) return;
    JournalRepository.getByUser(user.uid).then((entries) => {
      const memories = extractFromJournal(entries);
      setSignal(detectRiskSignal(memories));
    });
  }, [user?.uid]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="font-semibold text-white">Risk Signals</h3>

      <div className="mt-4 space-y-3 text-sm text-slate-400">
        {!signal ? (
          <p>Not enough data yet.</p>
        ) : signal.elevated ? (
          <p className="text-rose-300">
            {signal.recentDifficultCount} of your last 5 entries were difficult — consider
            reaching out to someone you trust.
          </p>
        ) : (
          <p className="text-navy-300">No elevated risk signals detected recently.</p>
        )}
      </div>
    </div>
  );
}

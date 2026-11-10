"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { JournalRepository } from "@/features/journal/journal-repository";
import { extractFromJournal } from "@/lib/memory/memory-extractor";
import { generateMemoryInsight } from "@/lib/memory/insight-generator";

export function AIInsightsCard() {
  const user = useAuthStore((state) => state.user);
  const [message, setMessage] = useState("Gathering insight...");

  useEffect(() => {
    if (!user?.uid) return;
    JournalRepository.getByUser(user.uid).then((entries) => {
      const memories = extractFromJournal(entries);
      setMessage(generateMemoryInsight(memories).message);
    });
  }, [user?.uid]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="font-semibold text-white">AI Insight</h3>
      <p className="mt-4 text-slate-400">{message}</p>
    </div>
  );
}

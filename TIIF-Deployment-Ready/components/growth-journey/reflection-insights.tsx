"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { JournalRepository } from "@/features/journal/journal-repository";
import { extractFromJournal } from "@/lib/memory/memory-extractor";
import { generateMemoryInsight } from "@/lib/memory/insight-generator";

export function ReflectionInsights() {
  const user = useAuthStore((state) => state.user);
  const [message, setMessage] = useState("Write a few reflections to unlock this insight.");

  useEffect(() => {
    if (!user?.uid) return;
    JournalRepository.getByUser(user.uid).then((entries) => {
      setMessage(generateMemoryInsight(extractFromJournal(entries)).message);
    });
  }, [user?.uid]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="font-semibold text-white">Reflection Insight</h3>
      <p className="mt-4 text-slate-400">{message}</p>
    </div>
  );
}

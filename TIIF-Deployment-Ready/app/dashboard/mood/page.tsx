"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { MoodForm } from "@/features/mood/mood-form";
import { MoodRepository } from "@/features/mood/mood-repository";
import { calculateEmotionalStability } from "@/features/mood/services/mood-patterns";
import type { MoodEntry } from "@/features/mood/types/mood-entry";

const MOOD_EMOJI: Record<string, string> = {
  excellent: "😄",
  good: "🙂",
  neutral: "😐",
  low: "😔",
  very_low: "😞",
};

export default function MoodPage() {
  const user = useAuthStore((state) => state.user);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadEntries() {
    if (!user?.uid) return;
    setIsLoading(true);
    const data = await MoodRepository.getByUser(user.uid);
    setEntries(data as MoodEntry[]);
    setIsLoading(false);
  }

  useEffect(() => {
    loadEntries();
  }, [user?.uid]);

  const stability = calculateEmotionalStability(entries);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Mood</h1>
        <p className="mt-1 text-slate-400">Check in with yourself.</p>
      </div>

      <MoodForm onSaved={loadEntries} />

      {entries.length >= 2 && (
        <div className="rounded-2xl border border-navy-500/20 bg-navy-500/5 p-4 text-sm text-navy-200">
          Emotional stability: <span className="font-semibold">{stability}%</span>
        </div>
      )}

      <div>
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-400">
          Recent check-ins
        </h3>

        {isLoading ? (
          <div className="flex justify-center py-12 text-slate-500">
            <Loader2 className="animate-spin" />
          </div>
        ) : entries.length === 0 ? (
          <p className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center text-sm text-slate-500">
            No check-ins yet.
          </p>
        ) : (
          <div className="space-y-2">
            {entries.slice(0, 10).map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm"
              >
                <div className="flex items-center gap-2 text-slate-200">
                  <span>{MOOD_EMOJI[entry.mood]}</span>
                  <span className="capitalize">{entry.mood.replace("_", " ")}</span>
                </div>
                <span className="text-xs text-slate-500">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

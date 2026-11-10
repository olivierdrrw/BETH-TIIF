"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Flame } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { JournalRepository } from "@/features/journal/journal-repository";
import { JournalCard } from "@/features/journal/components/journal-card";
import { analyzeSentiment } from "@/features/journal/services/journal-sentiment";
import { calculateJournalStreak } from "@/features/journal/components/journal-streak-card";
import { getJournalInsight } from "@/features/journal/services/journal-insights";
import { awardXPToUser } from "@/features/avatar/services/award-xp";
import type { JournalEntry } from "@/features/journal/types/journal-entry";

const MOODS: JournalEntry["mood"][] = ["great", "good", "neutral", "low", "difficult"];

export default function JournalPage() {
  const user = useAuthStore((state) => state.user);

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<JournalEntry["mood"]>("neutral");

  async function loadEntries() {
    if (!user?.uid) return;
    setIsLoading(true);
    const data = await JournalRepository.getByUser(user.uid);
    setEntries(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadEntries();
  }, [user?.uid]);

  async function handleSave() {
    if (!content.trim() || !user?.uid || isSaving) return;

    setIsSaving(true);

    const sentiment = analyzeSentiment(content);
    const tags = sentiment > 0 ? ["positive"] : sentiment < 0 ? ["difficult"] : [];

    await JournalRepository.create({
      userId: user.uid,
      title: title.trim() || "Untitled reflection",
      content: content.trim(),
      mood,
      tags,
      createdAt: new Date().toISOString(),
    });

    await awardXPToUser(user.uid, 15);

    setTitle("");
    setContent("");
    setMood("neutral");
    setIsSaving(false);
    loadEntries();
  }

  const streak = calculateJournalStreak(entries);
  const insight = getJournalInsight(entries);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Journal</h1>
          <p className="mt-1 text-slate-400">A private space to reflect.</p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-navy-300">
          <Flame size={16} />
          {streak} entries
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give this entry a title..."
          className="w-full bg-transparent text-lg font-medium text-white placeholder:text-slate-600 focus:outline-none"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          placeholder="What are you reflecting on today?"
          className="mt-3 w-full resize-none bg-transparent text-sm leading-6 text-slate-200 placeholder:text-slate-600 focus:outline-none"
        />

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex gap-1.5">
            {MOODS.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`rounded-full px-3 py-1.5 text-xs capitalize transition ${
                  mood === m
                    ? "bg-navy-500 text-white"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={!content.trim() || isSaving}
            className="flex items-center gap-2 rounded-xl bg-navy-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save Reflection
          </button>
        </div>
      </div>

      {entries.length >= 1 && (
        <div className="rounded-2xl border border-navy-500/20 bg-navy-500/5 p-4 text-sm text-navy-200">
          <span className="font-medium">{insight.title}:</span> {insight.description}
        </div>
      )}

      <div className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-12 text-slate-500">
            <Loader2 className="animate-spin" />
          </div>
        ) : entries.length === 0 ? (
          <p className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center text-sm text-slate-400">
            Nothing here yet — and that's alright.
            <br />
            <span className="text-slate-500">Whenever a thought is ready, this page will be waiting for it.</span>
          </p>
        ) : (
          entries.map((entry) => <JournalCard key={entry.id} entry={entry} />)
        )}
      </div>
    </div>
  );
}

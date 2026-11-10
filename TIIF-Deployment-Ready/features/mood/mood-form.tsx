"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { MoodRepository } from "./mood-repository";
import type { MoodType } from "./types/mood-entry";

const MOODS: { value: MoodType; label: string; emoji: string }[] = [
  { value: "excellent", label: "Excellent", emoji: "😄" },
  { value: "good", label: "Good", emoji: "🙂" },
  { value: "neutral", label: "Neutral", emoji: "😐" },
  { value: "low", label: "Low", emoji: "😔" },
  { value: "very_low", label: "Very Low", emoji: "😞" },
];

export function MoodForm({ onSaved }: { onSaved?: () => void }) {
  const user = useAuthStore((state) => state.user);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [stress, setStress] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    if (!selectedMood || !user?.uid || isSaving) return;

    setIsSaving(true);
    await MoodRepository.create({
      userId: user.uid,
      mood: selectedMood,
      energy,
      stress,
      createdAt: new Date().toISOString(),
    });

    setIsSaving(false);
    setSaved(true);
    setSelectedMood(null);
    onSaved?.();
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <p className="text-sm text-slate-400">How are you feeling right now?</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {MOODS.map((m) => (
          <button
            key={m.value}
            onClick={() => {
              setSelectedMood(m.value);
              setSaved(false);
            }}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
              selectedMood === m.value
                ? "border-navy-400/50 bg-navy-500/10 text-white"
                : "border-white/10 text-slate-400 hover:border-white/20"
            }`}
          >
            <span>{m.emoji}</span>
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Energy</span>
            <span>{energy}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="mt-2 w-full accent-navy-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Stress</span>
            <span>{stress}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={stress}
            onChange={(e) => setStress(Number(e.target.value))}
            className="mt-2 w-full accent-rose-500"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!selectedMood || isSaving}
        className="mt-6 flex items-center gap-2 rounded-xl bg-navy-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaving ? (
          <Loader2 size={14} className="animate-spin" />
        ) : saved ? (
          <Check size={14} />
        ) : null}
        {saved ? "Logged" : "Log check-in"}
      </button>
    </div>
  );
}

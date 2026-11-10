"use client";

import { useEffect, useState } from "react";
import { Dumbbell, Loader2 } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { WellnessRepository } from "../repositories/wellness-repository";
import type { WellnessLog } from "../types/wellness-log";

export function ExerciseTracker() {
  const user = useAuthStore((state) => state.user);
  const [minutes, setMinutes] = useState(30);
  const [entries, setEntries] = useState<WellnessLog[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  async function load() {
    if (!user?.uid) return;
    const data = await WellnessRepository.getByUserAndType(user.uid, "exercise");
    setEntries(data);
  }

  useEffect(() => {
    load();
  }, [user?.uid]);

  async function handleLog() {
    if (!user?.uid || isSaving) return;
    setIsSaving(true);
    await WellnessRepository.create({
      userId: user.uid,
      type: "exercise",
      value: minutes,
      createdAt: new Date().toISOString(),
    });
    setIsSaving(false);
    load();
  }

  const weekTotal = entries
    .filter((e) => Date.now() - new Date(e.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000)
    .reduce((s, e) => s + e.value, 0);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <div className="flex items-center gap-2 text-slate-400">
          <Dumbbell size={16} />
          <span className="text-sm">Log a workout</span>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <input
            type="range"
            min={5}
            max={120}
            step={5}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-full accent-navy-400"
          />
          <span className="w-16 shrink-0 text-right text-lg font-semibold text-white">
            {minutes}m
          </span>
        </div>

        <button
          onClick={handleLog}
          disabled={isSaving}
          className="mt-4 flex items-center gap-2 rounded-xl bg-navy-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-400 disabled:opacity-50"
        >
          {isSaving && <Loader2 size={14} className="animate-spin" />}
          Log workout
        </button>
      </div>

      <div className="rounded-2xl border border-navy-500/20 bg-navy-500/5 p-4 text-sm text-navy-200">
        This week: <span className="font-semibold">{weekTotal} minutes</span>
      </div>
    </div>
  );
}

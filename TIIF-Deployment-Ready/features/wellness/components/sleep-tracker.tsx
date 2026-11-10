"use client";

import { useEffect, useState } from "react";
import { Moon, Loader2 } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { WellnessRepository } from "../repositories/wellness-repository";
import type { WellnessLog } from "../types/wellness-log";

export function SleepTracker() {
  const user = useAuthStore((state) => state.user);
  const [hours, setHours] = useState(7);
  const [entries, setEntries] = useState<WellnessLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  async function load() {
    if (!user?.uid) return;
    setIsLoading(true);
    const data = await WellnessRepository.getByUserAndType(user.uid, "sleep");
    setEntries(data);
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, [user?.uid]);

  async function handleLog() {
    if (!user?.uid || isSaving) return;
    setIsSaving(true);
    await WellnessRepository.create({
      userId: user.uid,
      type: "sleep",
      value: hours,
      createdAt: new Date().toISOString(),
    });
    setIsSaving(false);
    load();
  }

  const average =
    entries.length > 0
      ? Math.round((entries.slice(0, 7).reduce((s, e) => s + e.value, 0) / Math.min(entries.length, 7)) * 10) / 10
      : 0;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <div className="flex items-center gap-2 text-slate-400">
          <Moon size={16} />
          <span className="text-sm">How many hours did you sleep last night?</span>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <input
            type="range"
            min={0}
            max={12}
            step={0.5}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full accent-navy-400"
          />
          <span className="w-14 shrink-0 text-right text-lg font-semibold text-white">
            {hours}h
          </span>
        </div>

        <button
          onClick={handleLog}
          disabled={isSaving}
          className="mt-4 flex items-center gap-2 rounded-xl bg-navy-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-400 disabled:opacity-50"
        >
          {isSaving && <Loader2 size={14} className="animate-spin" />}
          Log sleep
        </button>
      </div>

      {average > 0 && (
        <div className="rounded-2xl border border-navy-500/20 bg-navy-500/5 p-4 text-sm text-navy-200">
          7-day average: <span className="font-semibold">{average}h</span>
        </div>
      )}

      {!isLoading && entries.length > 0 && (
        <div className="space-y-2">
          {entries.slice(0, 7).map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-slate-300"
            >
              <span>{entry.value}h</span>
              <span className="text-xs text-slate-500">
                {new Date(entry.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

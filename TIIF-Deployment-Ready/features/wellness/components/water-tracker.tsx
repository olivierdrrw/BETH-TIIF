"use client";

import { useEffect, useState } from "react";
import { Droplet } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { WellnessRepository } from "../repositories/wellness-repository";

const GOAL = 8;

export function WaterTracker() {
  const user = useAuthStore((state) => state.user);
  const [count, setCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  async function load() {
    if (!user?.uid) return;
    const todayCount = await WellnessRepository.getTodayCount(user.uid, "water");
    setCount(todayCount);
  }

  useEffect(() => {
    load();
  }, [user?.uid]);

  async function addGlass() {
    if (!user?.uid || isSaving) return;
    setIsSaving(true);
    setCount((c) => c + 1);
    await WellnessRepository.create({
      userId: user.uid,
      type: "water",
      value: 1,
      createdAt: new Date().toISOString(),
    });
    setIsSaving(false);
  }

  const progress = Math.min(100, (count / GOAL) * 100);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center gap-2 text-slate-400">
        <Droplet size={16} />
        <span className="text-sm">Water intake today</span>
      </div>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-4xl font-bold text-white">{count}</span>
        <span className="pb-1 text-slate-500">/ {GOAL} glasses</span>
      </div>

      <div className="mt-4 h-2 rounded-full bg-white/5">
        <div
          style={{ width: `${progress}%` }}
          className="h-full rounded-full bg-gradient-to-r from-navy-400 to-navy-400 transition-all duration-500"
        />
      </div>

      <button
        onClick={addGlass}
        className="mt-4 flex items-center gap-2 rounded-xl bg-navy-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-400"
      >
        <Droplet size={14} /> Add a glass
      </button>
    </div>
  );
}

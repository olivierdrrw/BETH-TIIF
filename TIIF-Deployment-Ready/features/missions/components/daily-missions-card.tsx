"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { getUserProfile, updateUserProfile } from "@/repositories/user-repository";
import { awardXPToUser } from "@/features/avatar/services/award-xp";

const MISSIONS = [
  { id: "journal", label: "Write a journal reflection", href: "/dashboard/journal", xp: 10 },
  { id: "goal", label: "Check in on a goal", href: "/dashboard/goals", xp: 10 },
  { id: "breathe", label: "Try a breathing exercise", href: "/dashboard/wellness", xp: 10 },
];

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function DailyMissionsCard() {
  const user = useAuthStore((state) => state.user);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    if (!user?.uid) return;
    getUserProfile(user.uid).then((profile) => {
      const stored = profile?.dailyMissions as { date: string; completed: string[] } | undefined;
      if (stored?.date === today()) {
        setCompleted(stored.completed);
      }
    });
  }, [user?.uid]);

  async function toggle(id: string, xp: number) {
    if (!user?.uid || completed.includes(id)) return;

    const next = [...completed, id];
    setCompleted(next);

    await updateUserProfile(user.uid, { dailyMissions: { date: today(), completed: next } });
    await awardXPToUser(user.uid, xp);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="font-semibold text-white">Today's Missions</h3>
      <p className="mt-1 text-sm text-slate-400">Small steps, small rewards.</p>

      <div className="mt-4 space-y-2">
        {MISSIONS.map((m) => {
          const done = completed.includes(m.id);
          return (
            <button
              key={m.id}
              onClick={() => toggle(m.id, m.xp)}
              disabled={done}
              className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/[0.01] px-4 py-3 text-left transition hover:bg-white/[0.04] disabled:cursor-default"
            >
              {done ? (
                <CheckCircle2 size={18} className="shrink-0 text-success-500" />
              ) : (
                <Circle size={18} className="shrink-0 text-slate-600" />
              )}
              <span className={`flex-1 text-sm ${done ? "text-slate-500 line-through" : "text-slate-200"}`}>
                {m.label}
              </span>
              <span className="text-xs font-semibold text-navy-400">+{m.xp} XP</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

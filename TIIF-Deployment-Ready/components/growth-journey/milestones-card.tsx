"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { JournalRepository } from "@/features/journal/journal-repository";
import { GoalRepository } from "@/features/goals/repositories/goal-repository";
import { calculateJournalStreak } from "@/features/journal/components/journal-streak-card";

export function MilestonesCard() {
  const user = useAuthStore((state) => state.user);
  const [milestones, setMilestones] = useState<string[]>([]);

  useEffect(() => {
    if (!user?.uid) return;

    Promise.all([
      JournalRepository.getByUser(user.uid),
      GoalRepository.getUserGoals(user.uid),
    ]).then(([journals, goals]) => {
      const streak = calculateJournalStreak(journals);
      const completedGoals = (goals as any[]).filter((g) => g.status === "completed").length;

      const list: string[] = [];
      if (journals.length > 0) list.push(`${journals.length} reflection${journals.length === 1 ? "" : "s"} completed`);
      if (streak > 0) list.push(`${streak} entry streak`);
      if (completedGoals > 0) list.push(`${completedGoals} goal${completedGoals === 1 ? "" : "s"} completed`);
      if (list.length === 0) list.push("Your first milestone is one entry away");

      setMilestones(list);
    });
  }, [user?.uid]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="font-semibold text-white">Milestones</h3>
      <div className="mt-4 space-y-3 text-sm text-slate-400">
        {milestones.map((m) => (
          <p key={m} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success-500" aria-hidden="true" />
            {m}
          </p>
        ))}
      </div>
    </div>
  );
}

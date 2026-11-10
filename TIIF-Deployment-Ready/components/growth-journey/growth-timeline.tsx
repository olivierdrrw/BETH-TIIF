"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { JournalRepository } from "@/features/journal/journal-repository";
import { GoalRepository } from "@/features/goals/repositories/goal-repository";
import type { JournalEntry } from "@/features/journal/types/journal-entry";
import type { Goal } from "@/features/goals/types/goal";

interface TimelineItem {
  id: string;
  label: string;
  date: string;
}

export function GrowthTimeline() {
  const user = useAuthStore((state) => state.user);
  const [items, setItems] = useState<TimelineItem[]>([]);

  useEffect(() => {
    if (!user?.uid) return;

    Promise.all([
      JournalRepository.getByUser(user.uid),
      GoalRepository.getUserGoals(user.uid),
    ]).then(([journals, goals]) => {
      const journalItems: TimelineItem[] = (journals as JournalEntry[]).slice(0, 4).map((j) => ({
        id: j.id,
        label: `Reflected: "${j.title}"`,
        date: j.createdAt,
      }));

      const goalItems: TimelineItem[] = (goals as Goal[])
        .filter((g) => g.status === "completed")
        .slice(0, 4)
        .map((g) => ({ id: g.id, label: `Completed goal: ${g.title}`, date: g.createdAt }));

      const merged = [...journalItems, ...goalItems]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

      setItems(merged);
    });
  }, [user?.uid]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="font-semibold text-white">Journey Timeline</h3>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">Your journey starts with your first entry.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="border-l-2 border-navy-500/30 pl-4 text-sm">
              <p className="text-slate-200">{item.label}</p>
              <p className="text-xs text-slate-500">{new Date(item.date).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

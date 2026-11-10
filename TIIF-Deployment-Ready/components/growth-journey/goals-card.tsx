"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { GoalRepository } from "@/features/goals/repositories/goal-repository";
import type { Goal } from "@/features/goals/types/goal";

export function GoalsCard() {
  const user = useAuthStore((state) => state.user);
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    if (!user?.uid) return;
    GoalRepository.getUserGoals(user.uid).then((data) => setGoals((data as Goal[]).slice(0, 4)));
  }, [user?.uid]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="font-semibold text-white">Goals</h3>

      <div className="mt-4 space-y-3">
        {goals.length === 0 ? (
          <p className="text-sm text-slate-500">No goals yet.</p>
        ) : (
          goals.map((g) => (
            <div key={g.id} className="flex items-center gap-2 text-sm text-slate-300">
              {g.status === "completed" ? (
                <CheckCircle2 size={14} className="text-navy-400" />
              ) : (
                <Circle size={14} className="text-slate-600" />
              )}
              {g.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

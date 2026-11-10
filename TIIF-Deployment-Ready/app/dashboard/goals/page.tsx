"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { CreateGoalForm } from "@/features/goals/components/create-goal-form";
import { GoalCard } from "@/features/goals/components/goal-card";
import { GoalRepository } from "@/features/goals/repositories/goal-repository";
import { awardXPToUser } from "@/features/avatar/services/award-xp";
import type { Goal } from "@/features/goals/types/goal";

export default function GoalsPage() {
  const user = useAuthStore((state) => state.user);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadGoals() {
    if (!user?.uid) return;
    setIsLoading(true);
    const data = await GoalRepository.getUserGoals(user.uid);
    setGoals(data as Goal[]);
    setIsLoading(false);
  }

  useEffect(() => {
    loadGoals();
  }, [user?.uid]);

  async function handleComplete(goalId: string) {
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, status: "completed", progress: 100 } : g))
    );
    await GoalRepository.update(goalId, { status: "completed", progress: 100 });
    if (user?.uid) {
      await awardXPToUser(user.uid, 25);
    }
  }

  const active = goals.filter((g) => g.status !== "completed");
  const completed = goals.filter((g) => g.status === "completed");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Goals</h1>
        <p className="mt-1 text-slate-400">Track what you're working toward.</p>
      </div>

      <CreateGoalForm onCreated={loadGoals} />

      {isLoading ? (
        <div className="flex justify-center py-12 text-slate-500">
          <Loader2 className="animate-spin" />
        </div>
      ) : goals.length === 0 ? (
        <p className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center text-sm text-slate-500">
          No goals yet — add your first one above.
        </p>
      ) : (
        <div className="space-y-6">
          {active.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {active.map((goal) => (
                <GoalCard key={goal.id} goal={goal} onComplete={handleComplete} />
              ))}
            </div>
          )}

          {completed.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-400">
                Completed
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {completed.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

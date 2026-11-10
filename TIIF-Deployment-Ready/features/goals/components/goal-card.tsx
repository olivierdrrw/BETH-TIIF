import { CheckCircle2 } from "lucide-react";
import type { Goal } from "../types/goal";

interface Props {
  goal: Goal;
  onComplete?: (goalId: string) => void;
}

export function GoalCard({ goal, onComplete }: Props) {
  const progress = Math.min(100, Math.max(0, goal.progress ?? 0));

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
          {goal.description && (
            <p className="mt-1 text-sm text-slate-400">{goal.description}</p>
          )}
        </div>

        {goal.status !== "completed" && onComplete && (
          <button
            onClick={() => onComplete(goal.id)}
            title="Mark complete"
            className="shrink-0 text-slate-500 transition hover:text-navy-400"
          >
            <CheckCircle2 size={20} />
          </button>
        )}

        {goal.status === "completed" && (
          <CheckCircle2 size={20} className="shrink-0 text-success-500" />
        )}
      </div>

      <div className="mt-5 h-2 rounded-full bg-white/5">
        <div
          style={{ width: `${progress}%` }}
          className="h-full rounded-full bg-gradient-to-r from-navy-400 to-navy-400"
        />
      </div>

      <p className="mt-3 text-sm text-slate-400">{progress}% complete</p>
    </div>
  );
}

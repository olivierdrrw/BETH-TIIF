import { Trophy, Users } from "lucide-react";
import type { Challenge } from "../types/challenge";

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20">
      <div className="flex items-center gap-2">
        <Trophy size={16} className="text-navy-400" />
        <h4 className="font-medium text-white">{challenge.title}</h4>
      </div>

      <p className="mt-2 text-sm text-slate-400">{challenge.description}</p>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{challenge.durationDays} days</span>
        <span className="flex items-center gap-1">
          <Users size={12} />
          {challenge.participants}
        </span>
        <span className="text-navy-300">{challenge.rewardPoints} XP</span>
      </div>
    </div>
  );
}

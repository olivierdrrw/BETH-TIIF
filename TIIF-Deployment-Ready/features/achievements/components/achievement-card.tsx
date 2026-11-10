import type { Achievement } from "../types/achievement";

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div
      className={`rounded-3xl border p-6 transition ${
        achievement.unlocked
          ? "border-navy-400/30 bg-navy-500/5"
          : "border-white/5 bg-white/[0.02] opacity-50"
      }`}
    >
      <div className="text-4xl">{achievement.icon}</div>

      <h3 className="mt-4 font-semibold text-white">{achievement.title}</h3>

      <p className="mt-2 text-sm text-slate-400">{achievement.description}</p>

      <span
        className={`mt-4 inline-block rounded-full px-2.5 py-1 text-xs ${
          achievement.unlocked
            ? "bg-navy-500/10 text-navy-300"
            : "bg-white/5 text-slate-500"
        }`}
      >
        {achievement.unlocked ? "Unlocked" : "Locked"}
      </span>
    </div>
  );
}

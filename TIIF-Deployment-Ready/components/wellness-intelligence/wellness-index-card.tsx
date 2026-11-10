"use client";

import { useHumanTwin } from "@/hooks/use-human-twin";

export function WellnessIndexCard() {
  const { wellbeing, growth } = useHumanTwin();

  const message =
    wellbeing >= 70
      ? "Overall wellbeing is strong with positive growth trends."
      : wellbeing >= 45
      ? "Overall wellbeing is steady — there's room to build momentum."
      : "Overall wellbeing could use some extra care right now.";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
      <p className="text-sm text-slate-400">Wellness Index</p>
      <h2 className="mt-2 text-6xl font-bold text-white">{wellbeing}</h2>
      <p className="mt-3 text-slate-400">{message}</p>
    </div>
  );
}

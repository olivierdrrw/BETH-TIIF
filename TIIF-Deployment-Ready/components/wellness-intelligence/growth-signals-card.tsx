"use client";

import { useHumanTwin } from "@/hooks/use-human-twin";

export function GrowthSignalsCard() {
  const { growth, resilience } = useHumanTwin();

  const signals = [
    growth >= 70 ? "Growth trend is strengthening" : "Growth is steady, room to accelerate",
    resilience >= 70 ? "Resilience trend strengthening" : "Resilience is building",
    "Consistency compounds — keep showing up",
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="font-semibold text-white">Growth Signals</h3>
      <ul className="mt-4 space-y-3 text-sm text-slate-400">
        {signals.map((s) => <li key={s}>{s}</li>)}
      </ul>
    </div>
  );
}

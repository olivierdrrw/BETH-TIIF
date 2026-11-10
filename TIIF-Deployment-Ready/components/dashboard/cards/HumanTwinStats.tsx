"use client";

import { useHumanTwin } from "@/hooks/use-human-twin";

interface StatDef {
  label: string;
  value: number;
}

export function HumanTwinStats() {
  const { identity, growth, resilience, wellbeing } = useHumanTwin();

  const stats: StatDef[] = [
    { label: "Identity", value: identity },
    { label: "Growth", value: growth },
    { label: "Resilience", value: resilience },
    { label: "Wellbeing", value: wellbeing },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:bg-white/[0.05]"
        >
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {stat.label}
          </p>
          <p className="mt-1 text-2xl font-semibold text-white">
            {stat.value}
            <span className="text-sm font-normal text-slate-500">%</span>
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-navy-400 to-navy-400"
              style={{ width: `${Math.min(100, Math.max(0, stat.value))}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default HumanTwinStats;

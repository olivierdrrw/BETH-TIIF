"use client";

import { Counter } from "@/components/motion/counter";
import { ProgressBar } from "./progress-bar";

interface DashboardStatProps {
  title: string;
  value: number;
}

export function DashboardStat({
  title,
  value,
}: DashboardStatProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <span className="text-sm text-slate-400">
          {title}
        </span>

        <span className="text-xl font-semibold">
          <Counter end={value} suffix="%" />
        </span>

      </div>

      <ProgressBar value={value} />

    </div>
  );
}
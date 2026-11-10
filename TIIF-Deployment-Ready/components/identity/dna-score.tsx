"use client";

import { Counter } from "@/components/motion/counter";
import { ProgressBar } from "@/components/dashboard/ui/progress-bar";

interface DNAScoreProps {
  title: string;
  value: number;
}

export default function DNAScore({
  title,
  value,
}: DNAScoreProps) {
  return (
    <div className="space-y-3">

      <div className="flex items-center justify-between">

        <span className="text-sm text-slate-400">
          {title}
        </span>

        <span className="font-semibold">
          <Counter end={value} suffix="%" />
        </span>

      </div>

      <ProgressBar value={value} />

    </div>
  );
}
"use client";

import { ProgressBar } from "@/components/dashboard/ui/progress-bar";

interface PredictionScoreProps {
  title: string;
  score: number;
}

export function PredictionScore({
  title,
  score,
}: PredictionScoreProps) {
  return (
    <div className="space-y-3">

      <div className="flex justify-between">

        <span className="text-slate-400">
          {title}
        </span>

        <strong>{score}%</strong>

      </div>

      <ProgressBar value={score} />

    </div>
  );
}
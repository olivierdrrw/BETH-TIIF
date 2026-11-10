"use client";

import { useWellnessStore } from "@/stores/wellness-store";
import { calculateWellnessIndex } from "@/lib/wellness/calculate-wellness-index";

export function WellnessIndexCard() {
  const { dimensions } =
    useWellnessStore();

  const score =
    calculateWellnessIndex(dimensions);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-zinc-400">
        Wellness Index
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        {score}%
      </h2>
    </div>
  );
}
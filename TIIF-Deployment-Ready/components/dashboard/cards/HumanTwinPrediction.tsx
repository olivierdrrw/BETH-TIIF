"use client";

import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { useHumanTwin } from "@/hooks/use-human-twin";
import { generatePrediction } from "@/features/human-twin/services/prediction-engine";
import type { HumanTwinScoreSet } from "@/core/human-twin/score-engine";

const TREND_ICON = {
  rising: TrendingUp,
  declining: TrendingDown,
  steady: Minus,
} as const;

const TREND_COLOR = {
  rising: "text-success-400",
  declining: "text-rose-300",
  steady: "text-slate-300",
} as const;

export function HumanTwinPrediction() {
  const { identity, growth, resilience, wellbeing } = useHumanTwin();

  // Adapt the live store (5 dimensions) into the full 7-dimension score set
  // the prediction engine expects, using sensible proxies for the two
  // dimensions the lightweight store doesn't track yet.
  const scores: HumanTwinScoreSet = {
    identityScore: identity,
    growthScore: growth,
    wellbeingScore: wellbeing,
    resilienceScore: resilience,
    purposeScore: growth,
    relationshipScore: wellbeing,
    impactScore: Math.round((identity + growth + wellbeing + resilience) / 4),
  };

  const prediction = generatePrediction(scores);
  const Icon = TREND_ICON[prediction.direction];

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2">
        <Icon size={16} className={TREND_COLOR[prediction.direction]} />
        <p className="text-sm font-medium text-white">{prediction.headline}</p>
      </div>

      <p className="mt-1 text-xs text-slate-400">
        Confidence: {prediction.confidence}% · 30-day projection: {prediction.projectedOverallIn30Days}%
      </p>

      <div className="mt-3 flex items-center gap-2 rounded-xl bg-navy-500/10 px-3 py-2 text-sm text-navy-200">
        <ArrowRight size={14} />
        {prediction.nextBestAction}
      </div>
    </div>
  );
}

export default HumanTwinPrediction;

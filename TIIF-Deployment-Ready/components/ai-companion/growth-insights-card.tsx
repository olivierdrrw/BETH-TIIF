"use client";

import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useHumanTwin } from "@/hooks/use-human-twin";
import { generateTopInsight } from "@/features/human-twin/services/insight-engine";
import type { HumanTwinScoreSet } from "@/core/human-twin/score-engine";

export function GrowthInsightsCard() {
  const { identity, growth, wellbeing, resilience } = useHumanTwin();

  const scores: HumanTwinScoreSet = {
    identityScore: identity,
    growthScore: growth,
    wellbeingScore: wellbeing,
    resilienceScore: resilience,
    purposeScore: growth,
    relationshipScore: wellbeing,
    impactScore: Math.round((identity + growth + wellbeing + resilience) / 4),
  };

  const insight = generateTopInsight(scores);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-3xl border border-white/10 bg-white/[0.02] p-6"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-500/10 text-navy-400">
          <TrendingUp size={16} />
        </div>
        <h3 className="font-semibold text-white">Growth Insight</h3>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-400">{insight.message}</p>
    </motion.div>
  );
}

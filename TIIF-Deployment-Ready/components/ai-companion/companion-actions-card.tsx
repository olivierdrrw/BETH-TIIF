"use client";

import { CheckCircle2, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useHumanTwin } from "@/hooks/use-human-twin";
import { generatePrediction } from "@/features/human-twin/services/prediction-engine";
import type { HumanTwinScoreSet } from "@/core/human-twin/score-engine";

export function CompanionActionsCard() {
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

  const { nextBestAction } = generatePrediction(scores);

  const actions = [
    nextBestAction,
    "Review your growth goals",
    "Reach out to a trusted mentor",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-3xl border border-white/10 bg-white/[0.02] p-6"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-500/10 text-navy-400">
          <Target size={16} />
        </div>
        <h3 className="font-semibold text-white">Suggested Actions</h3>
      </div>

      <ul className="mt-4 space-y-3">
        {actions.map((action) => (
          <li key={action} className="flex items-start gap-2 text-sm text-slate-300">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-navy-400" />
            {action}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

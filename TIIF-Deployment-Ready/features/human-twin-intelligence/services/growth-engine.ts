import type { HumanTwin } from "@/types/human-twin";

/** Calculates a descriptive growth-potential score from available twin scores. */
export function calculateGrowthPotential(twin: HumanTwin): number {
  const scores = [
    twin.identityScore,
    twin.growthScore,
    twin.purposeScore,
    twin.impactScore,
  ].filter((score): score is number => typeof score === "number" && Number.isFinite(score));

  if (scores.length === 0) return 0;

  const average = scores.reduce((total, score) => total + score, 0) / scores.length;
  return Math.round(Math.max(0, Math.min(100, average)));
}

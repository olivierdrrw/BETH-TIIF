import type { HumanTwinScoreSet } from "@/core/human-twin/score-engine";
import type { FutureSelf } from "@/types/future-self";

/**
 * Future Self Engine
 *
 * Projects each domain forward using the same momentum idea as the
 * prediction engine (growth + resilience push scores up over time), just
 * applied per-domain instead of to a single overall number.
 */

function project(current: number, momentum: number, months: number): number {
  const projected = current + momentum * (months / 3);
  return Math.min(100, Math.max(0, Math.round(projected)));
}

export function generateFutureSelf(
  scores: HumanTwinScoreSet,
  monthsAhead: number = 6
): FutureSelf {
  const growthMomentum = (scores.growthScore - 50) * 0.15;
  const resilienceMomentum = (scores.resilienceScore - 50) * 0.15;

  return {
    confidence: project(
      (scores.identityScore + scores.resilienceScore) / 2,
      resilienceMomentum,
      monthsAhead
    ),
    purpose: project(scores.purposeScore, growthMomentum, monthsAhead),
    wellbeing: project(scores.wellbeingScore, resilienceMomentum, monthsAhead),
    relationships: project(scores.relationshipScore, growthMomentum * 0.6, monthsAhead),
    growth: project(scores.growthScore, growthMomentum, monthsAhead),
  };
}

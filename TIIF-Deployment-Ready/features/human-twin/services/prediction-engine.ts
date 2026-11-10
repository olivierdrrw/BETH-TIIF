import type { HumanTwinScoreSet } from "@/core/human-twin/score-engine";

/**
 * Prediction Engine
 *
 * Projects a short-term trajectory from the current score set. This is a
 * deterministic, explainable model (no black box) — it looks at how
 * balanced the scores are and how high the "growth" and "resilience"
 * scores are, since those two domains are the strongest predictors of
 * near-term movement.
 */

export type TrendDirection = "rising" | "steady" | "declining";

export interface HumanTwinPrediction {
  direction: TrendDirection;
  confidence: number; // 0-100
  projectedOverallIn30Days: number; // 0-100
  headline: string;
  nextBestAction: string;
}

function overall(scores: HumanTwinScoreSet): number {
  const values = Object.values(scores);
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

function lowestDomain(scores: HumanTwinScoreSet): keyof HumanTwinScoreSet {
  return (Object.entries(scores) as [keyof HumanTwinScoreSet, number][]).reduce(
    (lowest, [domain, value]) => (value < scores[lowest] ? domain : lowest),
    "identityScore" as keyof HumanTwinScoreSet
  );
}

const ACTION_BY_DOMAIN: Record<keyof HumanTwinScoreSet, string> = {
  identityScore: "Spend 10 minutes journaling about your values today.",
  growthScore: "Pick one goal and take the next small step on it.",
  wellbeingScore: "Take a short recovery walk or rest break.",
  impactScore: "Reflect on one thing that went well this week.",
  purposeScore: "Revisit your 'why' — write one sentence about it.",
  relationshipScore: "Reach out to someone in your Trusted Circle.",
  resilienceScore: "Try a short breathing or grounding exercise.",
};

export function generatePrediction(scores: HumanTwinScoreSet): HumanTwinPrediction {
  const current = overall(scores);

  // Growth + resilience push the trend up; low wellbeing pulls it down.
  const momentum =
    (scores.growthScore - 50) * 0.4 +
    (scores.resilienceScore - 50) * 0.3 +
    (scores.wellbeingScore - 50) * 0.3;

  const direction: TrendDirection =
    momentum > 5 ? "rising" : momentum < -5 ? "declining" : "steady";

  const projectedOverallIn30Days = Math.min(
    100,
    Math.max(0, Math.round(current + momentum * 0.5))
  );

  const confidence = Math.min(
    95,
    Math.max(40, Math.round(60 + Math.abs(momentum)))
  );

  const headline =
    direction === "rising"
      ? "Your overall trend is rising."
      : direction === "declining"
      ? "Your overall trend has dipped recently."
      : "Your overall trend is stable.";

  const focusDomain = lowestDomain(scores);

  return {
    direction,
    confidence,
    projectedOverallIn30Days,
    headline,
    nextBestAction: ACTION_BY_DOMAIN[focusDomain],
  };
}

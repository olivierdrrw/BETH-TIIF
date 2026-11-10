import {
  ImpactMetrics,
  ImpactResult,
} from "./impact-types";

export function calculateImpactScore(
  metrics: ImpactMetrics
): ImpactResult {
  const score =
    Math.round(
      (
        metrics.wellbeingImprovement +
        metrics.growthImprovement +
        metrics.journalConsistency +
        metrics.engagementScore +
        metrics.resilienceImprovement
      ) / 5
    );

  let category:
    | "low"
    | "moderate"
    | "high";

  if (score >= 75) {
    category = "high";
  } else if (score >= 50) {
    category = "moderate";
  } else {
    category = "low";
  }

  return {
    score,
    category,
    summary:
      category === "high"
        ? "Strong positive impact"
        : category === "moderate"
        ? "Growing impact"
        : "Needs support",
  };
}
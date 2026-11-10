import { ImpactMetrics } from "@/types/impact";

export function calculateImpactScore(
  metrics: ImpactMetrics
) {
  const total =
    metrics.wellbeingChange +
    metrics.identityChange +
    metrics.purposeChange +
    metrics.resilienceChange +
    metrics.relationshipChange +
    metrics.growthChange;

  return Math.round(total / 6);
}
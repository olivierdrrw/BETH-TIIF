import { GrowthMetrics } from "@/types/growth";

export function calculateGrowthScore(
  metrics: GrowthMetrics
) {
  const total =
    metrics.identity +
    metrics.purpose +
    metrics.wellbeing +
    metrics.resilience +
    metrics.relationships +
    metrics.consistency;

  return Math.round(total / 6);
}
import { WellnessDimensions } from "@/types/wellness";

export function calculateWellnessIndex(
  dimensions: WellnessDimensions
): number {
  const scores = [
    dimensions.mental,
    dimensions.emotional,
    dimensions.identity,
    dimensions.purpose,
    dimensions.relationships,
    dimensions.physical,
    dimensions.support,
  ];

  const total = scores.reduce(
    (sum, value) => sum + value,
    0
  );

  return Math.round(total / scores.length);
}
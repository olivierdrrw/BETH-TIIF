import { calculateIdentity } from "./calculate-identity";
import { calculateGrowth } from "./calculate-growth";
import { calculateWellness } from "./calculate-wellness";
import { calculateResilience } from "./calculate-resilience";
import { calculatePurpose } from "./calculate-purpose";
import type { HumanTwinSignals } from "@/types/human-twin-signals";

export function calculateHumanTwin(signals: HumanTwinSignals) {
  const wellnessScore = calculateWellness(signals);
  return {
    identityScore: calculateIdentity(signals),
    growthScore: calculateGrowth(signals),
    wellbeingScore: wellnessScore,
    wellnessScore,
    resilienceScore: calculateResilience(signals),
    purposeScore: calculatePurpose(signals),
  };
}

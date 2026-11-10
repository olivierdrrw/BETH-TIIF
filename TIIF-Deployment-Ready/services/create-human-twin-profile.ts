import {
  calculateHumanTwinScore,
} from "@/lib/intelligence/human-twin-engine";

export function createHumanTwinProfile(
  data: {
    identity: number;

    growth: number;

    wellbeing: number;

    purpose: number;
  }
) {

  const score =
    calculateHumanTwinScore(
      data
    );

  return {

    overallScore:
      score,

    currentSelf:
      score,

    potentialSelf:
      Math.min(
        score + 20,
        100
      ),
  };
}
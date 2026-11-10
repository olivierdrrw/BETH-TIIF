import { HumanTwin } from "@/types/human-twin";

export function deriveSignals(
  twin: HumanTwin
) {
  return {
    wellbeing:
      twin.wellbeingScore,

    resilience:
      twin.resilienceScore,

    purpose:
      twin.purposeScore,

    identity:
      twin.identityScore,
  };
}
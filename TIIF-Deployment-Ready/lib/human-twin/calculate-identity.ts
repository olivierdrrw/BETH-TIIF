import { HumanTwinSignals } from "@/types/human-twin-signals";

export function calculateIdentity(
  signals: HumanTwinSignals
) {
  return Math.min(
    100,
    Math.round(
      signals.reflections * 0.3 +
      signals.assessmentsCompleted * 5 +
      signals.aiInteractions * 0.1
    )
  );
}
import { HumanTwinSignals } from "@/types/human-twin-signals";

export function calculatePurpose(
  signals: HumanTwinSignals
) {
  return Math.min(
    100,
    Math.round(
      signals.goalsCompleted * 4 +
      signals.trustedConnections * 3
    )
  );
}
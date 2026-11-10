import { HumanTwinSignals } from "@/types/human-twin-signals";

export function calculateResilience(
  signals: HumanTwinSignals
) {
  return Math.min(
    100,
    Math.round(
      signals.streakDays +
      signals.goalsCompleted * 2
    )
  );
}
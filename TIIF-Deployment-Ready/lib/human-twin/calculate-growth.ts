import { HumanTwinSignals } from "@/types/human-twin-signals";

export function calculateGrowth(
  signals: HumanTwinSignals
) {
  return Math.min(
    100,
    Math.round(
      signals.goalsCompleted * 6 +
      signals.streakDays * 0.8
    )
  );
}
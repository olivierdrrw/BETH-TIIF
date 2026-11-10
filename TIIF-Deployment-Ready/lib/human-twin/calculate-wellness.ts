import { HumanTwinSignals } from "@/types/human-twin-signals";

export function calculateWellness(
  signals: HumanTwinSignals
) {
  return Math.min(
    100,
    Math.round(
      signals.moodEntries * 0.5 +
      signals.reflections * 0.2
    )
  );
}
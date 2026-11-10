import {
  MoodEntry,
} from "../types/mood-entry";

export function detectMoodRisk(
  entries: MoodEntry[]
) {

  const recent =
    entries.slice(-7);

  const lowCount =
    recent.filter(
      (entry) =>
        entry.mood ===
          "low" ||
        entry.mood ===
          "very_low"
    ).length;

  if (lowCount >= 5) {

    return {
      level:
        "high",

      recommendation:
        "Reach out for support.",
    };
  }

  return {
    level:
      "normal",

    recommendation:
      "Continue monitoring.",
  };
}
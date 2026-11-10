import {
  MoodEntry,
} from "../types/mood-entry";

export function calculateEmotionalStability(
  entries: MoodEntry[]
) {

  if (
    entries.length < 2
  ) {
    return 50;
  }

  const scores =
    entries.map(
      (entry) => {

        switch (
          entry.mood
        ) {

          case "excellent":
            return 100;

          case "good":
            return 80;

          case "neutral":
            return 60;

          case "low":
            return 40;

          case "very_low":
            return 20;
        }
      }
    );

  const average =
    scores.reduce(
      (a, b) => a + b,
      0
    ) /
    scores.length;

  return Math.round(
    average
  );
}
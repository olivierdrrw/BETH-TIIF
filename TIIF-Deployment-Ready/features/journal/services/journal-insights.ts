import {
  JournalEntry,
} from "../types/journal-entry";

export function getJournalInsight(
  entries: JournalEntry[]
) {

  if (
    entries.length < 3
  ) {
    return {
      title:
        "Keep Writing",
      description:
        "More reflections create stronger insights.",
    };
  }

  return {
    title:
      "Self Awareness Growing",
    description:
      "Your reflection habit is becoming consistent.",
  };
}
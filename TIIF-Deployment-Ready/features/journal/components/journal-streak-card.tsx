import {
  JournalEntry,
} from "../types/journal-entry";

export function calculateJournalStreak(
  entries: JournalEntry[]
) {

  if (
    entries.length === 0
  ) {
    return 0;
  }

  return entries.length;
}
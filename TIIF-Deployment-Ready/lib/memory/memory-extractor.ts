import type { MemoryRecord, MemoryType } from "@/types/memory";
import type { JournalEntry } from "@/features/journal/types/journal-entry";
import type { Goal } from "@/features/goals/types/goal";

/**
 * Converts raw journal/goal records into MemoryRecord entries the AI
 * Companion can draw on for context. "importance" is a simple heuristic:
 * longer, more recent, or completed items score higher.
 */

export function extractFromJournal(entries: JournalEntry[]): MemoryRecord[] {
  return entries.map((entry) => ({
    id: entry.id,
    type: "journal" as MemoryType,
    title: entry.title,
    content: entry.content,
    createdAt: entry.createdAt,
    importance: Math.min(10, Math.round(entry.content.length / 100) + 3),
    tags: [entry.mood, ...(entry.tags ?? [])],
  }));
}

export function extractFromGoals(goals: Goal[]): MemoryRecord[] {
  return goals.map((goal) => ({
    id: goal.id,
    type: "goal" as MemoryType,
    title: goal.title,
    content: `${goal.description ?? ""} (${goal.status}, ${goal.progress}% complete)`.trim(),
    createdAt: goal.createdAt,
    importance: goal.status === "completed" ? 8 : 5,
    tags: [goal.category, goal.status],
  }));
}

export function mergeMemories(...groups: MemoryRecord[][]): MemoryRecord[] {
  return groups
    .flat()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

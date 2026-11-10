import type { MemoryRecord } from "@/types/memory";

export interface DetectedPattern {
  tag: string;
  count: number;
}

/**
 * Finds the most frequently recurring tags across a set of memories —
 * the simplest reliable signal of a "pattern" (recurring mood, theme,
 * or category showing up again and again).
 */
export function detectPatterns(memories: MemoryRecord[], limit = 5): DetectedPattern[] {
  const counts = new Map<string, number>();

  for (const memory of memories) {
    for (const tag of memory.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .filter((p) => p.count >= 2)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

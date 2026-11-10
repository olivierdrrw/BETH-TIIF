import type { MemoryRecord } from "@/types/memory";

/**
 * Compares the importance of recent memories against older ones as a
 * simple proxy for whether things are trending up. Positive = growth,
 * negative = declining engagement/importance, near-zero = steady.
 */
export function detectGrowthTrend(memories: MemoryRecord[]): {
  trend: "improving" | "steady" | "declining";
  delta: number;
} {
  if (memories.length < 4) {
    return { trend: "steady", delta: 0 };
  }

  const sorted = [...memories].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const midpoint = Math.floor(sorted.length / 2);
  const earlier = sorted.slice(0, midpoint);
  const recent = sorted.slice(midpoint);

  const avg = (list: MemoryRecord[]) =>
    list.reduce((sum, m) => sum + m.importance, 0) / list.length;

  const delta = Math.round((avg(recent) - avg(earlier)) * 10) / 10;

  return {
    trend: delta > 0.5 ? "improving" : delta < -0.5 ? "declining" : "steady",
    delta,
  };
}

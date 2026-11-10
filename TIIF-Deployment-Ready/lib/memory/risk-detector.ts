import type { MemoryRecord } from "@/types/memory";

const RISK_TAGS = ["difficult", "very_low", "low"];

/**
 * Flags an elevated risk signal when difficult/low-mood tags cluster in
 * the most recent memories. This is a lightweight heuristic, not a
 * diagnostic tool — it exists to surface "check in on this person soon"
 * signals for the AI Companion and Trusted Circle, not to label anyone.
 */
export function detectRiskSignal(memories: MemoryRecord[]): {
  elevated: boolean;
  recentDifficultCount: number;
} {
  const recent = [...memories]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentDifficultCount = recent.filter((m) =>
    m.tags?.some((tag) => RISK_TAGS.includes(tag))
  ).length;

  return {
    elevated: recentDifficultCount >= 3,
    recentDifficultCount,
  };
}

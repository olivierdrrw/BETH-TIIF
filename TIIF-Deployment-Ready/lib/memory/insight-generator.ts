import type { MemoryRecord } from "@/types/memory";
import { detectPatterns } from "./pattern-detector";
import { detectGrowthTrend } from "./growth-detector";
import { detectRiskSignal } from "./risk-detector";

export interface MemoryInsight {
  message: string;
  tone: "positive" | "neutral" | "attention";
}

/**
 * Turns raw memories into a single, human-readable insight sentence —
 * combining recurring patterns, growth trend, and risk signal into
 * whichever is most worth surfacing right now.
 */
export function generateMemoryInsight(memories: MemoryRecord[]): MemoryInsight {
  if (memories.length === 0) {
    return { message: "Start journaling or setting goals to build your memory timeline.", tone: "neutral" };
  }

  const risk = detectRiskSignal(memories);
  if (risk.elevated) {
    return {
      message: "Things have felt heavier lately — consider reaching out to someone you trust.",
      tone: "attention",
    };
  }

  const growth = detectGrowthTrend(memories);
  if (growth.trend === "improving") {
    return { message: "Your recent entries show real momentum — keep going.", tone: "positive" };
  }

  const patterns = detectPatterns(memories);
  if (patterns.length > 0) {
    return {
      message: `"${patterns[0].tag}" keeps coming up in your recent reflections.`,
      tone: "neutral",
    };
  }

  return { message: "Keep showing up — every entry adds to your story.", tone: "neutral" };
}

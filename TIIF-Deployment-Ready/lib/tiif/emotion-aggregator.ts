import type { EmotionTag, MemoryRecord } from "@/types/memory";

export function getDominantEmotion(memories: MemoryRecord[]): EmotionTag {
  const counts: Partial<Record<EmotionTag, number>> = {};
  for (const memory of memories) {
    if (!memory.emotion) continue;
    counts[memory.emotion] = (counts[memory.emotion] ?? 0) + 1;
  }

  let emotion: EmotionTag = "calm";
  let highest = 0;
  for (const [key, count] of Object.entries(counts)) {
    const value = count ?? 0;
    if (value > highest) {
      highest = value;
      emotion = key as EmotionTag;
    }
  }
  return emotion;
}

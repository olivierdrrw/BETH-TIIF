import {
    MemoryRecord,
  } from "@/types/memory";
  
  export function
  getLongTermPatterns(
    memories:
      MemoryRecord[]
  ) {
    const emotions =
      memories.map(
        (m) =>
          m.emotion
      );
  
    return {
      totalMemories:
        memories.length,
  
      emotionalHistory:
        emotions,
    };
  }
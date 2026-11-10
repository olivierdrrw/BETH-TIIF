import {
    MemoryRecord,
  } from "@/types/memory";
  
  export function
  summarizeMemories(
    memories:
      MemoryRecord[]
  ) {
    if (
      memories.length === 0
    ) {
      return
        "No memories available.";
    }
  
    const recent =
      memories.slice(-5);
  
    return recent
      .map(
        (memory) =>
          memory.content
      )
      .join(" • ");
  }
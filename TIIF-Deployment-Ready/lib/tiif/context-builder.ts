import {
    MemoryRecord,
  } from "@/types/memory";
  
  import {
    summarizeMemories,
  } from "./memory-summary";
  
  export function
  buildContext(
    memories:
      MemoryRecord[]
  ) {
    return {
      totalMemories:
        memories.length,
  
      summary:
        summarizeMemories(
          memories
        ),
  
      recentMemories:
        memories.slice(-5),
    };
  }
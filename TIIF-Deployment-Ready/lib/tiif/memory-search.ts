import {
    MemoryRecord,
  } from "@/types/memory";
  
  export function
  searchMemories(
    memories:
      MemoryRecord[],
    query: string
  ) {
    const q =
      query.toLowerCase();
  
    return memories.filter(
      (memory) =>
        memory.content
          .toLowerCase()
          .includes(q)
    );
  }
import {
    getMemories,
  } from "@/repositories/memory-repository";
  
  export async function
  getMemoryAnalytics() {
  
    const memories =
      await getMemories();
  
    return {
      totalMemories:
        memories.length,
  
      recentMemories:
        memories.slice(-5),
    };
  }
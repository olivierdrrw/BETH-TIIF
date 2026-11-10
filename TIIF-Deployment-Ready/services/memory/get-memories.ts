import {
    getMemories,
  } from "@/repositories/memory-repository";
  
  export async function
  fetchMemories() {
    return getMemories();
  }
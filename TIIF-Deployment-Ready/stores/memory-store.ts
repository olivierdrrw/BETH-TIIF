import { create } from "zustand";

import {
  MemoryRecord,
} from "@/types/memory";

interface MemoryState {
  memories: MemoryRecord[];

  addMemory: (
    memory: MemoryRecord
  ) => void;

  clearMemories: () => void;
}

export const useMemoryStore =
  create<MemoryState>(
    (set) => ({
      memories: [],

      addMemory: (memory) =>
        set((state) => ({
          memories: [
            memory,
            ...state.memories,
          ],
        })),

      clearMemories: () =>
        set({
          memories: [],
        }),
    })
  );
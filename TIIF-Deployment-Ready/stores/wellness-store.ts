import { create } from "zustand";

import { WellnessDimensions } from "@/types/wellness";

interface WellnessState {
  dimensions: WellnessDimensions;

  updateDimensions: (
    updates: Partial<WellnessDimensions>
  ) => void;
}

export const useWellnessStore =
  create<WellnessState>((set) => ({
    dimensions: {
      mental: 75,
      emotional: 80,
      identity: 72,
      purpose: 69,
      relationships: 78,
      physical: 70,
      support: 82,
    },

    updateDimensions: (updates) =>
      set((state) => ({
        dimensions: {
          ...state.dimensions,
          ...updates,
        },
      })),
  }));
import { create } from "zustand";
import { HumanTwin } from "@/types/human-twin";

interface HumanTwinState {
  twin: HumanTwin;

  updateTwin: (
    updates: Partial<HumanTwin>
  ) => void;
}

export const useHumanTwinStore =
  create<HumanTwinState>((set) => ({
    twin: {
      id: "default",

      identityScore: 72,

      growthScore: 68,

      wellbeingScore: 81,

      resilienceScore: 77,

      purposeScore: 70,

      connectionScore: 75,

      dominantEmotion: "calm",

      lastUpdated:
        new Date().toISOString(),
    },

    updateTwin: (updates) =>
      set((state) => ({
        twin: {
          ...state.twin,
          ...updates,
        },
      })),
  }));
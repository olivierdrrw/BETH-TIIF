import { create } from "zustand";

interface GrowthState {
  growthScore: number;

  updateGrowth:
    (score: number) => void;
}

export const useGrowthStore =
  create<GrowthState>(
    (set) => ({
      growthScore: 0,

      updateGrowth:
        (score) =>
          set({
            growthScore:
              score,
          }),
    })
  );
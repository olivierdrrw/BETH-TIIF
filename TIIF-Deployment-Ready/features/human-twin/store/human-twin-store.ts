"use client";

import { create } from "zustand";

interface HumanTwinState {
  identity: number;
  wellbeing: number;
  resilience: number;
  growth: number;
  aiConfidence: number;

  updateIdentity: (value: number) => void;
  updateGrowth: (value: number) => void;
}

export const useHumanTwinStore = create<HumanTwinState>((set) => ({
  identity: 91,
  wellbeing: 88,
  resilience: 92,
  growth: 94,
  aiConfidence: 97,

  updateIdentity: (value) =>
    set({ identity: value }),

  updateGrowth: (value) =>
    set({ growth: value }),
}));
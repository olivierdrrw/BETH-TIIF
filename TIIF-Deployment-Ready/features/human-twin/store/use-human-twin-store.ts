"use client";

import { create } from "zustand";

export interface HumanTwinState {
  identity: number;
  growth: number;
  resilience: number;
  wellbeing: number;
  aiConfidence: number;
  emotionalState: string;

  setTwin: (
    data: Partial<HumanTwinState>
  ) => void;
}

export const useHumanTwinStore =
create<HumanTwinState>((set)=>({

identity:91,
growth:94,
resilience:92,
wellbeing:88,
aiConfidence:97,
emotionalState:"Calm",

setTwin:(data)=>
set((state)=>({
...state,
...data,
})),

}));
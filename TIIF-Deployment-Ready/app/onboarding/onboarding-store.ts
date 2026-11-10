import { create }
from "zustand";

interface State {

  step: number;

  next: () => void;

  previous: () => void;
}

export const
useOnboardingStore =
create<State>((set) => ({

  step: 1,

  next: () =>
    set((s) => ({
      step:
        s.step + 1,
    })),

  previous: () =>
    set((s) => ({
      step:
        s.step - 1,
    })),
}));
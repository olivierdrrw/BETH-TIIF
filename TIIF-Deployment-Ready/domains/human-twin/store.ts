import { create } from "zustand";

import { HumanTwin } from "./types";

interface HumanTwinState {
  twin: HumanTwin | null;

  loading: boolean;

  setTwin: (
    twin: HumanTwin
  ) => void;

  updateTwin: (
    updates: Partial<HumanTwin>
  ) => void;
}

export const useHumanTwinStore =
  create<HumanTwinState>(
    (set) => ({
      twin: null,

      loading: false,

      setTwin: (twin) =>
        set({
          twin,
        }),

      updateTwin: (
        updates
      ) =>
        set((state) => ({
          twin: state.twin
            ? {
                ...state.twin,
                ...updates,
              }
            : null,
        })),
    })
  );
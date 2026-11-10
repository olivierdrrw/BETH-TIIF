import { create } from "zustand";
import { JourneyEvent } from "@/features/journey/journey-event";

interface JourneyState {
  events: JourneyEvent[];

  addEvent: (
    event: JourneyEvent
  ) => void;
}

export const useJourneyStore =
  create<JourneyState>((set) => ({
    events: [],

    addEvent: (event) =>
      set((state) => ({
        events: [
          event,
          ...state.events,
        ],
      })),
  }));
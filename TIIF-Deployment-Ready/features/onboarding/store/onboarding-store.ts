import { create } from "zustand";

interface OnboardingState {
  traumaCompleted: boolean;

  identityCompleted: boolean;

  purposeCompleted: boolean;

  humanTwinCreated: boolean;

  completeTrauma: () => void;

  completeIdentity: () => void;

  completePurpose: () => void;

  createTwin: () => void;
}

export const useOnboardingStore =
  create<OnboardingState>((set) => ({
    traumaCompleted: false,

    identityCompleted: false,

    purposeCompleted: false,

    humanTwinCreated: false,

    completeTrauma: () =>
      set({
        traumaCompleted: true,
      }),

    completeIdentity: () =>
      set({
        identityCompleted: true,
      }),

    completePurpose: () =>
      set({
        purposeCompleted: true,
      }),

    createTwin: () =>
      set({
        humanTwinCreated: true,
      }),
  }));
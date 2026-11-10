import { create } from "zustand";

import { InstitutionTwin }
from "@/types/institution-twin";

interface InstitutionState {
  institution: InstitutionTwin;
}

export const useInstitutionStore =
  create<InstitutionState>(() => ({
    institution: {
      wellnessIndex: 82,

      growthIndex: 78,

      resilienceIndex: 74,

      riskIndex: 24,

      supportIndex: 88,

      impactIndex: 79,
    },
  }));
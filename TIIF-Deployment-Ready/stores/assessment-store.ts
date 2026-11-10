import { create }
from "zustand";

import {
  AssessmentResult,
} from "@/types/assessment-result";

interface AssessmentState {
  result:
    AssessmentResult | null;

  setResult:
    (
      result:
        AssessmentResult
    ) => void;
}

export const
useAssessmentStore =
  create<
    AssessmentState
  >(
    (set) => ({
      result: null,

      setResult:
        (result) =>
          set({
            result,
          }),
    })
  );
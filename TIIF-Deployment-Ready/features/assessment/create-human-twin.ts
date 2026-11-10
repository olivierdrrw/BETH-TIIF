import {
  AssessmentResult,
} from "@/types/assessment-result";

import {
  HumanTwin,
} from "@/types/human-twin";

export function
createHumanTwin(
  result:
    AssessmentResult
): HumanTwin {

  return {
    id:
      crypto.randomUUID(),

    identityScore:
      result.identityClarity,

    growthScore:
      50,

    wellbeingScore:
      result.emotionalRegulation,

    resilienceScore:
      result.resilience,

    purposeScore:
      result.purpose,

    connectionScore:
      result.belonging,

    dominantEmotion:
      "calm",

    lastUpdated:
      new Date()
        .toISOString(),
  };
}
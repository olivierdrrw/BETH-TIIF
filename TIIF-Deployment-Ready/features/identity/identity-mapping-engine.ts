import { IdentityProfile } from "./identity-types";

export function mapIdentity(
  answers: number[]
): IdentityProfile {
  const score =
    Math.round(
      answers.reduce(
        (a, b) => a + b,
        0
      ) / answers.length
    ) * 20;

  return {
    valuesScore: score,
    purposeScore: score,
    selfAwarenessScore: score,
    confidenceScore: score,
    belongingScore: score,
    strengthsScore: score,
    growthAreasScore:
      100 - score,

    identityClarityScore:
      score,
  };
}
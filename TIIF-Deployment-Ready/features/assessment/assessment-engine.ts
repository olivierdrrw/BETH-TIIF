import { AssessmentResult }
from "@/types/assessment-result";

export function calculateAssessment(
  answers: number[]
): AssessmentResult {

  const average =
    answers.reduce(
      (a, b) => a + b,
      0
    ) / answers.length;

  const score =
    Math.round(
      average * 20
    );

  return {
    emotionalRegulation: score,
    identityClarity: score,
    resilience: score,
    belonging: score,
    purpose: score,

    traumaImpact:
      100 - score,

    riskLevel:
      score >= 75
        ? "low"
        : score >= 50
        ? "moderate"
        : "high",

    completedAt:
      new Date()
        .toISOString(),
  };
}
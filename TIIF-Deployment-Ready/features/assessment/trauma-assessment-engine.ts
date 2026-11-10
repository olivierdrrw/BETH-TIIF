import {
  AssessmentAnswer,
  AssessmentResult,
} from "./assessment-types";

import {
  calculateRisk,
} from "./risk-calculator";

export function runAssessment(
  answers: AssessmentAnswer[]
): AssessmentResult {
  const average =
    answers.reduce(
      (sum, answer) =>
        sum + answer.value,
      0
    ) / answers.length;

  const identityScore =
    average * 20;

  const emotionalScore =
    average * 18;

  const resilienceScore =
    average * 19;

  const relationshipScore =
    average * 21;

  const purposeScore =
    average * 20;

  const traumaScore =
    100 - average * 20;

  const overallScore =
    (
      identityScore +
      emotionalScore +
      resilienceScore +
      relationshipScore +
      purposeScore
    ) / 5;

  return {
    identityScore,
    emotionalScore,
    resilienceScore,
    relationshipScore,
    purposeScore,
    traumaScore,

    overallScore,

    riskLevel:
      calculateRisk(
        traumaScore
      ),
  };
}
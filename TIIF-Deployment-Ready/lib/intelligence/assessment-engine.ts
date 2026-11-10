export interface AssessmentResult {
  traumaScore: number;

  riskLevel:
    | "low"
    | "moderate"
    | "high";
}

export function calculateTraumaScore(
  answers: number[]
): AssessmentResult {

  const total =
    answers.reduce(
      (sum, value) =>
        sum + value,
      0
    );

  if (total < 20) {
    return {
      traumaScore: total,
      riskLevel: "low",
    };
  }

  if (total < 50) {
    return {
      traumaScore: total,
      riskLevel: "moderate",
    };
  }

  return {
    traumaScore: total,
    riskLevel: "high",
  };
}
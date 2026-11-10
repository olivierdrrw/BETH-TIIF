export function calculateAssessment(
  scores: number[]
) {

  const totalScore =
    scores.reduce(
      (sum, score) =>
        sum + score,
      0
    );

  let traumaRisk =
    "Low";

  if (totalScore >= 25) {
    traumaRisk = "Moderate";
  }

  if (totalScore >= 50) {
    traumaRisk = "High";
  }

  if (totalScore >= 75) {
    traumaRisk =
      "Very High";
  }

  return {
    totalScore,
    traumaRisk,
  };
}
export function determineRiskLevel(
  traumaScore: number
) {

  if (traumaScore >= 75) {
    return "high";
  }

  if (traumaScore >= 45) {
    return "moderate";
  }

  return "low";
}
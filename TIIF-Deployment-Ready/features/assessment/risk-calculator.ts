export function calculateRisk(
  traumaScore: number
) {
  if (traumaScore >= 75) {
    return "high";
  }

  if (traumaScore >= 45) {
    return "medium";
  }

  return "low";
}
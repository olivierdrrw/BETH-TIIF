export function calculateRisk(
  score: number
) {
  if (score >= 80)
    return "high";

  if (score >= 50)
    return "medium";

  return "low";
}
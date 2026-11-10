export function
getRecommendations(
  riskScore:
    number
) {
  if (
    riskScore >= 90
  ) {
    return [
      "Talk with a trusted person.",
      "Take time to rest.",
      "Schedule a wellness check-in.",
    ];
  }

  if (
    riskScore >= 60
  ) {
    return [
      "Practice breathing exercises.",
      "Write a short reflection.",
      "Take a short walk.",
    ];
  }

  return [
    "Continue wellness tracking.",
    "Celebrate positive moments.",
  ];
}
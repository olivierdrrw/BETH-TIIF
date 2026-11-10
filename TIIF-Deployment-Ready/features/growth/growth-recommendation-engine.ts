export function getGrowthRecommendation(
  score: number
) {
  if (score < 40) {
    return {
      title:
        "Focus on Reflection",
      action:
        "Complete one journal reflection today.",
    };
  }

  if (score < 70) {
    return {
      title:
        "Strengthen Consistency",
      action:
        "Maintain daily reflection for 7 days.",
    };
  }

  return {
    title:
      "Expand Purpose",
    action:
      "Set a meaningful growth goal this week.",
  };
}
export interface Recommendation {
  title: string;
  description: string;
}

export function generateRecommendations(
  twinScore: number
): Recommendation[] {

  if (twinScore < 50) {
    return [
      {
        title:
          "Complete Reflection",
        description:
          "Spend 10 minutes reflecting today.",
      },
    ];
  }

  if (twinScore < 80) {
    return [
      {
        title:
          "Growth Opportunity",
        description:
          "Review your goals and journal.",
      },
    ];
  }

  return [
    {
      title:
        "Maintain Momentum",
      description:
        "Continue current growth habits.",
    },
  ];
}
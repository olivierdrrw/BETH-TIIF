export interface DashboardInsight {
  title: string;

  description: string;
}

export function generateInsights(
  score: number
): DashboardInsight[] {

  if (score >= 80) {
    return [
      {
        title:
          "Excellent Progress",
        description:
          "Your Human Twin shows strong growth patterns.",
      },
    ];
  }

  if (score >= 60) {
    return [
      {
        title:
          "Steady Growth",
        description:
          "You are progressing consistently.",
      },
    ];
  }

  return [
    {
      title:
        "Growth Opportunity",
      description:
        "Focus on journaling and reflection.",
    },
  ];
}
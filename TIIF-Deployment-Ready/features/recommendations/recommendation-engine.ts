export function generateRecommendations(
  impactScore: number
) {

  if (
    impactScore < 60
  ) {

    return [
      {
        id: "1",

        title:
          "Complete Reflection",

        category:
          "growth",

        impact: 4,
      },
    ];
  }

  return [];
}
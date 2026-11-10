export function generateRecommendations(
  twin: any
) {

  const recommendations = [];

  if (
    twin.traumaScore > 60
  ) {

    recommendations.push(
      "Consider guided reflection exercises."
    );

  }

  if (
    twin.identityScore < 60
  ) {

    recommendations.push(
      "Complete Identity Mapping."
    );

  }

  if (
    twin.wellbeingScore < 60
  ) {

    recommendations.push(
      "Track mood daily for two weeks."
    );

  }

  return recommendations;
}
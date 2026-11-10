export function getRecommendations(
  purpose: number,
  wellbeing: number
) {
  const recommendations = [];

  if (purpose < 60) {
    recommendations.push(
      "Explore purpose reflections."
    );
  }

  if (wellbeing < 60) {
    recommendations.push(
      "Schedule wellbeing check-in."
    );
  }

  return recommendations;
}
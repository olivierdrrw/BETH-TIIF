export function
generatePopulationInsights(
  population:
    number,
  risk:
    number,
  wellness:
    number
) {
  const insights:
    string[] = [];

  if (
    wellness >= 80
  ) {
    insights.push(
      "Population wellness indicators are strong."
    );
  }

  if (
    risk >= 60
  ) {
    insights.push(
      "Population risk indicators require attention."
    );
  }

  if (
    population >=
    100000
  ) {
    insights.push(
      "Large population dataset available for research."
    );
  }

  return insights;
}
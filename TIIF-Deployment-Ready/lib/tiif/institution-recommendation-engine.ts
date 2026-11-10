export function
generateInstitutionRecommendations(
  wellness:
    number,
  risk:
    number
) {
  const items:
    string[] = [];

  if (
    risk >= 70
  ) {
    items.push(
      "Increase wellness interventions."
    );

    items.push(
      "Schedule additional check-ins."
    );
  }

  if (
    wellness < 70
  ) {
    items.push(
      "Expand wellness programs."
    );
  }

  if (
    items.length ===
    0
  ) {
    items.push(
      "Current indicators are healthy."
    );
  }

  return items;
}
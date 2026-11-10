export function
generatePolicyRecommendations(
  nationalRisk:
    number
) {
  const items:
    string[] = [];

  if (
    nationalRisk >=
    80
  ) {
    items.push(
      "Increase national mental health interventions."
    );

    items.push(
      "Deploy additional wellness professionals."
    );
  }

  if (
    nationalRisk >=
    60
  ) {
    items.push(
      "Expand school wellness programs."
    );
  }

  if (
    items.length ===
    0
  ) {
    items.push(
      "Maintain current wellness initiatives."
    );
  }

  return items;
}
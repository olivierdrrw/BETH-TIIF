export function
generateRecommendations(
  predictedRisk:
    number,
  predictedWellness:
    number
) {
  const items:
    string[] = [];

  if (
    predictedRisk >=
    80
  ) {
    items.push(
      "Immediate wellness intervention recommended."
    );
  }

  if (
    predictedWellness <
    70
  ) {
    items.push(
      "Increase wellness monitoring."
    );
  }

  if (
    items.length ===
    0
  ) {
    items.push(
      "Current trends appear healthy."
    );
  }

  return items;
}
export function calculateIdentityScore(
  scores: number[]
) {
  if (!scores.length) {
    return 0;
  }

  const total =
    scores.reduce(
      (sum, value) =>
        sum + value,
      0
    );

  return Math.round(
    total / scores.length
  );
}
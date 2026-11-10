export function
calculateWellness(
  growthScore:
    number,
  resilienceScore:
    number
) {
  return Math.round(
    (
      growthScore +
      resilienceScore
    ) / 2
  );
}
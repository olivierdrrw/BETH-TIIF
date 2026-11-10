export interface ImpactInput {
  previousGrowth: number;

  currentGrowth: number;

  previousWellbeing: number;

  currentWellbeing: number;
}

export function calculateImpact(
  input: ImpactInput
) {
  const growthImpact =
    input.currentGrowth -
    input.previousGrowth;

  const wellbeingImpact =
    input.currentWellbeing -
    input.previousWellbeing;

  return Math.round(
    (
      growthImpact +
      wellbeingImpact
    ) / 2
  );
}
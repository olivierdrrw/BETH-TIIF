interface Input {

  identity: number;

  growth: number;

  wellbeing: number;

  purpose: number;

  reflection: number;

  consistency: number;
}

export function calculateImpactScore(
  input: Input
) {

  const score =

    input.identity * 0.2 +

    input.growth * 0.2 +

    input.wellbeing * 0.2 +

    input.purpose * 0.15 +

    input.reflection * 0.15 +

    input.consistency * 0.1;

  return Math.round(score);
}
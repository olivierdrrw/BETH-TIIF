export interface HumanTwinScores {
  identity: number;

  growth: number;

  wellbeing: number;

  purpose: number;
}

export function calculateHumanTwinScore(
  scores: HumanTwinScores
) {
  return Math.round(
    (
      scores.identity +
      scores.growth +
      scores.wellbeing +
      scores.purpose
    ) / 4
  );
}
export function predictGrowthTrajectory(
  currentScore: number,
  consistencyScore: number
) {

  const projectedGrowth =
    currentScore +
    consistencyScore * 0.3;

  return Math.min(
    Math.round(projectedGrowth),
    100
  );
}
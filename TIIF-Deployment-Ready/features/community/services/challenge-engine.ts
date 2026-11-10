export function calculateChallengeProgress(
  completedDays: number,
  durationDays: number
) {

  return Math.round(
    (completedDays / durationDays)
    * 100
  );
}
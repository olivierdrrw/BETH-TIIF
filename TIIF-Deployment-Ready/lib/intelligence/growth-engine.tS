export interface GrowthInput {
  journalConsistency: number;

  assessmentCompletion: number;

  reflectionFrequency: number;

  goalProgress: number;
}

export function calculateGrowthScore(
  input: GrowthInput
) {
  return Math.round(
    (
      input.journalConsistency +
      input.assessmentCompletion +
      input.reflectionFrequency +
      input.goalProgress
    ) / 4
  );
}
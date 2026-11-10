export interface PurposeInput {
  direction: number;

  meaning: number;

  goals: number;

  fulfillment: number;
}

export function calculatePurposeScore(
  input: PurposeInput
) {
  return Math.round(
    (
      input.direction +
      input.meaning +
      input.goals +
      input.fulfillment
    ) / 4
  );
}
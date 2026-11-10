export interface WellbeingInput {
  mood: number;

  stress: number;

  sleep: number;

  energy: number;
}

export function calculateWellbeingScore(
  input: WellbeingInput
) {
  return Math.round(
    (
      input.mood +
      input.sleep +
      input.energy +
      (100 - input.stress)
    ) / 4
  );
}
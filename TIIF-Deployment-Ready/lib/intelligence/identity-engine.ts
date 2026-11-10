export interface IdentityInput {
  values: number;

  purpose: number;

  selfAwareness: number;

  confidence: number;
}

export function calculateIdentityScore(
  input: IdentityInput
) {
  return Math.round(
    (
      input.values +
      input.purpose +
      input.selfAwareness +
      input.confidence
    ) / 4
  );
}
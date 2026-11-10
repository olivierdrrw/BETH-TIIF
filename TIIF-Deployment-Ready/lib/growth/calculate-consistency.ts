export function calculateConsistency(
  completed: number,
  expected: number
) {
  if (!expected) return 0;

  return Math.round(
    (completed / expected) * 100
  );
}
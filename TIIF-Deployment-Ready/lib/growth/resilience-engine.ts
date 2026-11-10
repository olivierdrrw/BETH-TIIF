export function calculateResilience(
  recovery: number,
  regulation: number,
  support: number
) {
  return Math.round(
    (recovery +
      regulation +
      support) /
      3
  );
}
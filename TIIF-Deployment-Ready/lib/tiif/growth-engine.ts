export function
calculateGrowth(
  totalReflections:
    number
) {
  return Math.min(
    100,
    totalReflections * 2
  );
}
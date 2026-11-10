export function calculateIdentityGap(
  current: number,
  potential: number
) {
  return {
    gap:
      potential - current,

    progress:
      Math.round(
        (current /
          potential) *
          100
      ),
  };
}
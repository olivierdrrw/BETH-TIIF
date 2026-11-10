export function calculateAvatarLevel(
  growthScore: number
) {

  return Math.floor(
    growthScore / 10
  );
}
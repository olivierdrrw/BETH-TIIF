export function calculateAvatarLevel(
  xp: number
) {

  return Math.floor(
    xp / 100
  ) + 1;
}

const RANKS: { min: number; name: string }[] = [
  { min: 16, name: "Guide" },
  { min: 8, name: "Achiever" },
  { min: 4, name: "Explorer" },
  { min: 1, name: "Newcomer" },
];

export function getIdentityRank(level: number): string {
  return RANKS.find((rank) => level >= rank.min)?.name ?? "Newcomer";
}
export function getAIRecommendation(
  growth: number,
  purpose: number
) {
  if (purpose < 60) {
    return `
Explore your values
and long-term goals.
`;
  }

  if (growth < 60) {
    return `
Create a weekly
growth reflection.
`;
  }

  return `
Keep building your
current habits.
`;
}
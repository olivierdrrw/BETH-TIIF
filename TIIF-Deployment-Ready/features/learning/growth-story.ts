export interface StoryInput {
  identity: number;
  growth: number;
  wellbeing: number;
  purpose: number;
}

export function generateGrowthStory(
  data: StoryInput
) {
  const story: string[] = [];

  if (data.identity > 75) {
    story.push(
      "Identity clarity is improving."
    );
  }

  if (data.growth > 75) {
    story.push(
      "Growth habits are becoming consistent."
    );
  }

  if (data.wellbeing > 75) {
    story.push(
      "Wellbeing indicators remain positive."
    );
  }

  if (data.purpose > 75) {
    story.push(
      "Purpose and direction are strengthening."
    );
  }

  return story.join(" ");
}
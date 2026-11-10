import { HumanTwin }
from "@/types/human-twin";

export function generateInsights(
  twin: HumanTwin
) {

  const insights = [];

  if (
    twin.purposeScore <
    50
  ) {

    insights.push({
      title:
        "Purpose Opportunity",

      description:
        "Explore your purpose reflections.",

      priority:
        "high",
    });
  }

  if (
    twin.identityScore <
    60
  ) {

    insights.push({
      title:
        "Identity Development",

      description:
        "Update your identity profile.",

      priority:
        "medium",
    });
  }

  return insights;
}
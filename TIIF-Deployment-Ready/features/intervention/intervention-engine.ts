import { HumanTwin }
from "@/types/human-twin";

export function generateInterventions(
  twin: HumanTwin
) {

  const interventions = [];

  if (
    twin.purposeScore < 50
  ) {

    interventions.push({
      id: crypto.randomUUID(),

      title:
        "Purpose Reflection",

      description:
        "Complete a purpose reflection exercise.",

      estimatedImpact: 5,

      category:
        "purpose",
    });
  }

  if (
    twin.identityScore < 60
  ) {

    interventions.push({
      id: crypto.randomUUID(),

      title:
        "Identity Mapping",

      description:
        "Review your values and strengths.",

      estimatedImpact: 4,

      category:
        "identity",
    });
  }

  return interventions;
}
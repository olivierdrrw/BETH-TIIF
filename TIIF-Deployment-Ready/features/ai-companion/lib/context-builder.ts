import { HumanTwin }
from "@/types/human-twin";

export function buildContext(
  twin: HumanTwin
) {
  return `
Identity Score:
${twin.identityScore}

Growth Score:
${twin.growthScore}

Wellbeing Score:
${twin.wellbeingScore}

Purpose Score:
${twin.purposeScore}

Dominant Emotion:
${twin.dominantEmotion}
`;
}
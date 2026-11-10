import { HumanTwin } from "@/types/human-twin";

import { IdentityProfile } from
"@/features/identity/identity-types";

export function initializeHumanTwin(
  identity:
    IdentityProfile
): HumanTwin {
  return {
    id: crypto.randomUUID(),

    identityScore:
      identity.identityClarityScore,

    growthScore:
      identity.growthAreasScore,

    wellbeingScore:
      identity.belongingScore,

    resilienceScore:
      identity.confidenceScore,

    purposeScore:
      identity.purposeScore,

    connectionScore:
      identity.belongingScore,

    dominantEmotion:
      "calm",

    lastUpdated:
      new Date().toISOString(),
  };
}
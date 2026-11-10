import {
  HumanTwin,
} from "@/types/human-twin";

export function createHumanTwin() {
  const twin: HumanTwin = {
    id: crypto.randomUUID(),

    identityScore: 50,

    growthScore: 50,

    wellbeingScore: 50,

    resilienceScore: 50,

    purposeScore: 50,

    connectionScore: 50,

    dominantEmotion: "calm",

    lastUpdated:
      new Date().toISOString(),
  };

  return twin;
}
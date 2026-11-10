import {
  HumanTwinRepository,
}
from "@/features/human-twin/repositories/human-twin-repository";

export async function createInitialHumanTwin(
  userId: string
) {

  await HumanTwinRepository.save(
    userId,
    {

      traumaScore: 0,

      identityScore: 0,

      wellbeingScore: 0,

      growthScore: 0,

      impactScore: 0,

      purposeScore: 0,

      resilienceScore: 0,

      currentMood: "neutral",

      xp: 0,

      level: 1,

      updatedAt:
        new Date().toISOString(),

    }
  );
}
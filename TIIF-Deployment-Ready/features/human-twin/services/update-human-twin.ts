import {
  HumanTwinRepository,
} from "@/repositories/human-twin/human-twin-repository";

import {
  calculateLifeDomainAverage,
} from "@/lib/life-domains/calculate-life-domain-score";

import {
  LifeDomainResults,
} from "@/features/life-domains/types/life-domain";

export async function updateHumanTwinFromDomains(
  userId: string,
  domains: LifeDomainResults
) {

  const twin =
    await HumanTwinRepository.get(
      userId
    );

  if (!twin) return;

  const overall =
    calculateLifeDomainAverage(
      domains
    );

  await HumanTwinRepository.save(
    userId,
    {
      ...twin,

      wellbeingScore:
        overall,

      lastUpdated:
        new Date()
          .toISOString(),
    }
  );
}
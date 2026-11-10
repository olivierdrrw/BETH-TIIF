import { LifeDomains }
from "@/features/life-domains/types/life-domain";

export function calculateDomainAverage(
  domains: LifeDomains
) {
  return Math.round(
    Object.values(domains)
      .reduce(
        (a, b) => a + b,
        0
      ) /
      Object.keys(domains)
        .length
  );
}
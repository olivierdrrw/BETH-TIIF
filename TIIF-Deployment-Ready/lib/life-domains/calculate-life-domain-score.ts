import type { LifeDomains } from "./life-domain.type";

export function calculateLifeDomainAverage(domains: LifeDomains): number {
  const values = Object.values(domains);
  if (values.length === 0) return 0;
  return Math.round(values.reduce((total, value) => total + value, 0) / values.length);
}

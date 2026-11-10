export const identityDomains = [
  "values",
  "strengths",
  "purpose",
  "beliefs",
  "relationships",
  "growth",
  "futureVision",
] as const;

export type IdentityDomain =
  (typeof identityDomains)[number];
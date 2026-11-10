export function calculateHumanTwinScore(
  scores: number[]
) {

  const total =
    scores.reduce(
      (sum, value) =>
        sum + value,
      0
    );

  return Math.round(
    total / scores.length
  );
}

// ---------------------------------------------------------------------------
// calculateScores
//
// Takes raw onboarding/assessment input (identity score, purpose score, and
// the 8 Life Domains) and produces the full multi-dimensional Human Twin
// score set used across the dashboard, the orb, and the AI Companion.
// ---------------------------------------------------------------------------

export interface LifeDomainsInput {
  mental: number;
  emotional: number;
  identity: number;
  relationships: number;
  education: number;
  career: number;
  purpose: number;
  physical: number;
}

export interface CalculateScoresInput {
  identity?: number;
  purpose?: number;
  domains?: Partial<LifeDomainsInput>;
  goals?: unknown[];
}

export interface HumanTwinScoreSet {
  identityScore: number;
  growthScore: number;
  wellbeingScore: number;
  impactScore: number;
  purposeScore: number;
  relationshipScore: number;
  resilienceScore: number;
}

const DEFAULT_DOMAIN_VALUE = 50;

function domainValue(
  domains: Partial<LifeDomainsInput> | undefined,
  key: keyof LifeDomainsInput
): number {
  const value = domains?.[key];
  return typeof value === "number" && !Number.isNaN(value)
    ? clamp(value)
    : DEFAULT_DOMAIN_VALUE;
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, Math.round(value)));
}

function average(values: number[]): number {
  if (values.length === 0) return DEFAULT_DOMAIN_VALUE;
  return clamp(values.reduce((sum, v) => sum + v, 0) / values.length);
}

export function calculateScores({
  identity,
  purpose,
  domains,
}: CalculateScoresInput): HumanTwinScoreSet {

  const mental = domainValue(domains, "mental");
  const emotional = domainValue(domains, "emotional");
  const domainIdentity = domainValue(domains, "identity");
  const relationships = domainValue(domains, "relationships");
  const education = domainValue(domains, "education");
  const career = domainValue(domains, "career");
  const domainPurpose = domainValue(domains, "purpose");
  const physical = domainValue(domains, "physical");

  const identityScore = clamp(
    typeof identity === "number" ? identity : domainIdentity
  );

  const purposeScore = clamp(
    typeof purpose === "number" ? purpose : domainPurpose
  );

  const wellbeingScore = average([mental, emotional, physical]);

  const relationshipScore = relationships;

  // Growth blends the "forward-moving" domains: education, career, purpose.
  const growthScore = average([education, career, purposeScore]);

  // Resilience blends emotional regulation with mental steadiness.
  const resilienceScore = average([emotional, mental, wellbeingScore]);

  // Impact is the whole-person average — how far the person is moving,
  // weighted slightly toward wellbeing and purpose since those compound.
  const impactScore = clamp(
    wellbeingScore * 0.3 +
      growthScore * 0.25 +
      purposeScore * 0.2 +
      relationshipScore * 0.15 +
      resilienceScore * 0.1
  );

  return {
    identityScore,
    growthScore,
    wellbeingScore,
    impactScore,
    purposeScore,
    relationshipScore,
    resilienceScore,
  };
}
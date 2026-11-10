export interface HumanTwinState {

  identityScore: number;

  growthScore: number;

  wellbeingScore: number;

  purposeScore: number;

  impactScore: number;

  resilienceScore: number;

  lifeDomainScores: Record<
    string,
    number
  >;

  currentLevel: string;
}
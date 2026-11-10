/**
 * Big Five (OCEAN) personality model — the most widely validated,
 * non-proprietary framework for this kind of self-assessment.
 */
export interface PersonalityProfile {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  emotionalStability: number;
  completedAt: string;
}

export type PersonalityTrait = keyof Omit<PersonalityProfile, "completedAt">;

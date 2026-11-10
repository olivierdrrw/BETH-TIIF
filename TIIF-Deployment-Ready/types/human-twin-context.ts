export interface HumanTwinContext {
  identityScore: number;

  growthScore: number;

  wellbeingScore: number;

  resilienceScore: number;

  purposeScore: number;

  relationshipScore: number;

  dominantEmotion: string;

  activeGoals: number;

  riskLevel:
    | "low"
    | "medium"
    | "high";

  lastAssessmentDate: string;
}
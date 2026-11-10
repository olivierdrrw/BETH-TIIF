export interface HumanTwin {
  id: string;

  userId: string;

  identityScore: number;

  growthScore: number;

  wellbeingScore: number;

  resilienceScore: number;

  dominantEmotion: string;

  totalReflections: number;

  riskLevel:
    | "low"
    | "medium"
    | "high";

  lastUpdated: string;
}
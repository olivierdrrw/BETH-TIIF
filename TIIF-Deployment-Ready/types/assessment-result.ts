export interface AssessmentResult {
  emotionalRegulation: number;

  identityClarity: number;

  resilience: number;

  belonging: number;

  purpose: number;

  traumaImpact: number;

  riskLevel:
    | "low"
    | "moderate"
    | "high";

  completedAt: string;
}
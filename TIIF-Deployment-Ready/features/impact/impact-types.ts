export interface ImpactMetrics {
  wellbeingImprovement: number;

  growthImprovement: number;

  journalConsistency: number;

  engagementScore: number;

  resilienceImprovement: number;
}

export interface ImpactResult {
  score: number;

  category:
    | "low"
    | "moderate"
    | "high";

  summary: string;
}
export interface GrowthSignal {
  consistency: number;

  wellbeing: number;

  resilience: number;

  selfAwareness: number;

  purpose: number;
}

export interface GrowthScore {
  overall: number;

  trend:
    | "improving"
    | "stable"
    | "declining";

  nextMilestone: string;
}
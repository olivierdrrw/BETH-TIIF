export interface Recommendation {

  id: string;

  title: string;

  category:
    | "identity"
    | "growth"
    | "purpose"
    | "wellbeing";

  impact: number;
}
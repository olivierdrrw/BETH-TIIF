export interface Intervention {

  id: string;

  title: string;

  description: string;

  estimatedImpact: number;

  category:
    | "identity"
    | "growth"
    | "purpose"
    | "wellbeing";
}
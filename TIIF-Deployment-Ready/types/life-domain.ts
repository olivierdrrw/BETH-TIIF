export interface LifeDomain {
  id: string;

  name:
    | "mental"
    | "emotional"
    | "identity"
    | "relationships"
    | "education"
    | "career"
    | "purpose"
    | "physical";

  score: number;

  trend:
    | "improving"
    | "stable"
    | "declining";
}
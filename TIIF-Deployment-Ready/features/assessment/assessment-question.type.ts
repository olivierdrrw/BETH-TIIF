export interface AssessmentQuestion {
  id: string;

  question: string;

  category:
    | "identity"
    | "trauma"
    | "relationships"
    | "emotional"
    | "self-worth";

  weight: number;
}
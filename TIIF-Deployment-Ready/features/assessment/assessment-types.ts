export interface AssessmentDomain {
  id: string;

  title: string;

  description: string;

  weight: number;
}

export interface AssessmentQuestion {
  id: string;

  category:
    | "identity"
    | "emotional"
    | "relationships"
    | "resilience"
    | "purpose"
    | "trauma";

  question: string;

  weight: number;
}

export interface AssessmentAnswer {
  questionId: string;

  value: number;
}

export interface AssessmentResult {
  identityScore: number;

  emotionalScore: number;

  resilienceScore: number;

  relationshipScore: number;

  purposeScore: number;

  traumaScore: number;

  overallScore: number;

  riskLevel: "low" | "medium" | "high";
}

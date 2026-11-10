export interface AssessmentQuestion {
  id: string;
  question: string;
}

export interface AssessmentAnswer {
  questionId: string;
  score: number;
}

export interface AssessmentResult {
  totalScore: number;
  traumaRisk: string;
}
export interface AssessmentQuestion {
  id: string;

  question: string;

  category:
    | "emotion"
    | "identity"
    | "belonging"
    | "purpose"
    | "resilience";
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "q1",
    question:
      "I understand my emotions clearly.",
    category: "emotion",
  },

  {
    id: "q2",
    question:
      "I know who I am and what I value.",
    category: "identity",
  },

  {
    id: "q3",
    question:
      "I feel supported by people around me.",
    category: "belonging",
  },

  {
    id: "q4",
    question:
      "I have a sense of purpose.",
    category: "purpose",
  },

  {
    id: "q5",
    question:
      "I recover from challenges effectively.",
    category: "resilience",
  },
];
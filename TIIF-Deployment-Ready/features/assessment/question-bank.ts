import {
  AssessmentQuestion,
} from "./assessment-types";

export const assessmentQuestions:
  AssessmentQuestion[] = [
  {
    id: "identity_1",
    category: "identity",
    question:
      "I understand who I am as a person.",
    weight: 2,
  },

  {
    id: "identity_2",
    category: "identity",
    question:
      "My values guide my decisions.",
    weight: 2,
  },

  {
    id: "emotion_1",
    category: "emotional",
    question:
      "I can identify my emotions.",
    weight: 2,
  },

  {
    id: "emotion_2",
    category: "emotional",
    question:
      "I feel overwhelmed by stress.",
    weight: 3,
  },

  {
    id: "relationship_1",
    category: "relationships",
    question:
      "I have people I trust.",
    weight: 2,
  },

  {
    id: "resilience_1",
    category: "resilience",
    question:
      "I recover after difficult situations.",
    weight: 3,
  },

  {
    id: "purpose_1",
    category: "purpose",
    question:
      "My life feels meaningful.",
    weight: 3,
  },

  {
    id: "trauma_1",
    category: "trauma",
    question:
      "Past experiences still affect me today.",
    weight: 4,
  },

  {
    id: "trauma_2",
    category: "trauma",
    question:
      "I often feel unsafe or fearful.",
    weight: 4,
  },
];
import type { PersonalityTrait } from "../types/personality";

export interface PersonalityQuestion {
  id: string;
  trait: PersonalityTrait;
  statement: string;
  reversed?: boolean;
}

export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
  { id: "o1", trait: "openness", statement: "I enjoy exploring new ideas and experiences." },
  { id: "o2", trait: "openness", statement: "I prefer familiar routines over trying new things.", reversed: true },
  { id: "c1", trait: "conscientiousness", statement: "I follow through on my commitments." },
  { id: "c2", trait: "conscientiousness", statement: "I often leave tasks unfinished.", reversed: true },
  { id: "e1", trait: "extraversion", statement: "I feel energized after spending time with people." },
  { id: "e2", trait: "extraversion", statement: "I prefer quiet, solitary activities.", reversed: true },
  { id: "a1", trait: "agreeableness", statement: "I go out of my way to help others." },
  { id: "a2", trait: "agreeableness", statement: "I find it easy to be critical of people.", reversed: true },
  { id: "n1", trait: "emotionalStability", statement: "I stay calm under pressure." },
  { id: "n2", trait: "emotionalStability", statement: "Small setbacks tend to stress me out.", reversed: true },
];

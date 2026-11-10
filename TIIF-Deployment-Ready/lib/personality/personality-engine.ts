import { PERSONALITY_QUESTIONS } from "@/features/personality/data/personality-questions";
import type { PersonalityProfile, PersonalityTrait } from "@/features/personality/types/personality";

/**
 * Scores raw 1-5 Likert answers into a 0-100 Big Five profile.
 * answers: map of questionId -> value (1-5).
 */
export function calculatePersonalityProfile(
  answers: Record<string, number>
): PersonalityProfile {
  const traits: PersonalityTrait[] = [
    "openness",
    "conscientiousness",
    "extraversion",
    "agreeableness",
    "emotionalStability",
  ];

  const scores = {} as Record<PersonalityTrait, number>;

  for (const trait of traits) {
    const questions = PERSONALITY_QUESTIONS.filter((q) => q.trait === trait);
    const values = questions.map((q) => {
      const raw = answers[q.id] ?? 3;
      return q.reversed ? 6 - raw : raw;
    });
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
    scores[trait] = Math.round(((avg - 1) / 4) * 100);
  }

  return {
    ...scores,
    completedAt: new Date().toISOString(),
  };
}

export const TRAIT_LABELS: Record<PersonalityTrait, string> = {
  openness: "Openness",
  conscientiousness: "Conscientiousness",
  extraversion: "Extraversion",
  agreeableness: "Agreeableness",
  emotionalStability: "Emotional Stability",
};

export const TRAIT_DESCRIPTIONS: Record<PersonalityTrait, string> = {
  openness: "Curiosity and openness to new ideas and experiences.",
  conscientiousness: "Organization, follow-through, and reliability.",
  extraversion: "Energy drawn from social interaction versus solitude.",
  agreeableness: "Warmth, empathy, and cooperation with others.",
  emotionalStability: "Steadiness under stress and pressure.",
};

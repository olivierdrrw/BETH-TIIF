export type MoodType =
  | "excellent"
  | "good"
  | "neutral"
  | "low"
  | "very_low";

export interface MoodEntry {

  id: string;

  userId: string;

  mood: MoodType;

  energy: number;

  stress: number;

  notes?: string;

  createdAt: string;
}
export type JourneyCategory =
  | "assessment"
  | "identity"
  | "growth"
  | "purpose"
  | "community"
  | "achievement";

export interface JourneyEvent {
  id: string;

  title: string;

  description: string;

  category: JourneyCategory;

  createdAt: string;
}
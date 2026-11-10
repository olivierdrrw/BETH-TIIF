export interface JourneyEvent {
  id: string;

  title: string;

  description: string;

  category:
    | "assessment"
    | "identity"
    | "goal"
    | "journal"
    | "community"
    | "milestone"
    | "achievement";

  createdAt: string;
}
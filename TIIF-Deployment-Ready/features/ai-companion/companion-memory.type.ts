export interface CompanionMemory {
  id: string;

  userId: string;

  category:
    | "goal"
    | "journal"
    | "assessment"
    | "identity"
    | "achievement";

  content: string;

  importance: number;

  createdAt: string;
}
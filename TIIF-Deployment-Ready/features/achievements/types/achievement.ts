export interface Achievement {

  id: string;

  title: string;

  description: string;

  icon: string;

  category:
    | "journal"
    | "identity"
    | "purpose"
    | "growth"
    | "community";

  unlocked: boolean;

  unlockedAt?: string;
}
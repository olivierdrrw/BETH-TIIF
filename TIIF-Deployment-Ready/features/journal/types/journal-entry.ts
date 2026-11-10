export interface JournalEntry {

  id: string;

  userId: string;

  title: string;

  content: string;

  mood:
    | "great"
    | "good"
    | "neutral"
    | "low"
    | "difficult";

  tags: string[];

  createdAt: string;
}
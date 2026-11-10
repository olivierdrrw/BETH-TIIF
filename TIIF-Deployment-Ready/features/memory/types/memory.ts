export interface Memory {

  id?: string;

  userId: string;

  type:
    | "goal"
    | "journal"
    | "mood"
    | "identity";

  content: string;

  createdAt: string;
}
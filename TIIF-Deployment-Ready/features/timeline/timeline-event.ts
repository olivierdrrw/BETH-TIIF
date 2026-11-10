export interface TimelineEvent {

  id: string;

  title: string;

  description: string;

  createdAt: string;

  type:
    | "assessment"
    | "goal"
    | "journal"
    | "achievement"
    | "growth";
}
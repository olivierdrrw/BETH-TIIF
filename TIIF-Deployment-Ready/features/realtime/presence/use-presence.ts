export interface Presence {
  userId: string;

  status:
    | "online"
    | "offline"
    | "away";

  lastSeen: string;
}
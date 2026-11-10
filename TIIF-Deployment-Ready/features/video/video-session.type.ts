export interface VideoSession {

  id: string;

  hostId: string;

  participantIds:
    string[];

  startTime: string;

  status:
    | "scheduled"
    | "live"
    | "ended";
}
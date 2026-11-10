export interface VideoSession {

  id: string;

  hostId: string;

  participantIds: string[];

  startedAt: string;

  endedAt?: string;
}
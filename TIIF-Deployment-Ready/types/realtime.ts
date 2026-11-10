export interface RealtimeEvent {
    id: string;
  
    type:
      | "notification"
      | "memory"
      | "human_twin"
      | "risk"
      | "analytics";
  
    entityId: string;
  
    createdAt: string;
  }
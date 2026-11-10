export interface Notification {
    id: string;
  
    userId: string;
  
    title: string;
  
    description: string;
  
    type:
      | "info"
      | "warning"
      | "critical";
  
    read: boolean;
  
    createdAt: string;
  }
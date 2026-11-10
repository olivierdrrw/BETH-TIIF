export interface Conversation {
    id: string;
  
    userId: string;
  
    role:
      | "user"
      | "assistant";
  
    message: string;
  
    emotion?: string;
  
    createdAt: string;
  }
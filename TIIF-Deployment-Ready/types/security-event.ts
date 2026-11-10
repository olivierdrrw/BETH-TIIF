export interface SecurityEvent {
    id: string;
  
    userId: string;
  
    tenantId: string;
  
    type:
      | "login"
      | "logout"
      | "permission_denied"
      | "password_reset";
  
    createdAt: string;
  }
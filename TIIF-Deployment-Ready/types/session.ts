export interface UserSession {
    userId: string;
  
    tenantId: string;
  
    email: string;
  
    role: string;
  
    accessToken: string;
  
    expiresAt: string;
  }
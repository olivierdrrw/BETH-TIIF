export interface AuditLog {
    id: string;
  
    userId: string;
  
    tenantId: string;
  
    action: string;
  
    resource: string;
  
    createdAt: string;
  }
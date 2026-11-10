export interface RiskAlert {
    id: string;
  
    userId: string;
  
    severity:
      | "low"
      | "medium"
      | "high";
  
    reason: string;
  
    createdAt: string;
  
    resolved: boolean;
  }
export interface User {
    id: string;
  
    fullName: string;
  
    email: string;
  
    role:
      | "member"
      | "therapist"
      | "admin"
      | "researcher";
  
    wellnessScore: number;
  
    riskLevel:
      | "low"
      | "medium"
      | "high";
  
    createdAt: string;
  }
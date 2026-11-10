export interface ResearchStudy {
    id: string;
  
    title: string;
  
    description: string;
  
    category:
      | "wellness"
      | "risk"
      | "education"
      | "population";
  
    participants: number;
  
    status:
      | "draft"
      | "active"
      | "completed";
  
    createdAt: string;
  
    updatedAt: string;
  }
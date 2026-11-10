export interface Organization {
    id: string;
  
    tenantId: string;
  
    name: string;
  
    type:
      | "school"
      | "university"
      | "company"
      | "ngo"
      | "hospital"
      | "government";
  
    regionId: string;
  
    createdAt: string;
  
    updatedAt: string;
  }
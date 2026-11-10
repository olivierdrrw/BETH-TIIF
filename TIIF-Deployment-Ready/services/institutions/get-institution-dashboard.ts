import {
    getInstitutionAnalytics,
  } from "./get-institution-analytics";
  
  export async function
  getInstitutionDashboard() {
    const analytics =
      await getInstitutionAnalytics();
  
    return {
      ...analytics,
  
      lastUpdated:
        new Date()
          .toISOString(),
    };
  }
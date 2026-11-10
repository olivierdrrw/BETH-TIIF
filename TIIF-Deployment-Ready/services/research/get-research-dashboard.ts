import {
    getResearchAnalytics,
  } from "./get-research-analytics";
  
  export async function
  getResearchDashboard() {
    const analytics =
      await getResearchAnalytics();
  
    return {
      ...analytics,
  
      lastUpdated:
        new Date()
          .toISOString(),
    };
  }
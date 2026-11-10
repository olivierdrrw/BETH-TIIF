import {
    getResearchStudies,
  } from "@/repositories/research-repository";
  
  export async function
  getResearchAnalytics() {
    const studies =
      await getResearchStudies();
  
    return {
      totalStudies:
        studies.length,
  
      activeStudies:
        studies.filter(
          (study) =>
            study.status ===
            "active"
        ).length,
  
      completedStudies:
        studies.filter(
          (study) =>
            study.status ===
            "completed"
        ).length,
    };
  }
import {
    DashboardIntelligence,
  } from "@/types/dashboard-intelligence";
  
  import {
    getDashboardCounts,
    getWellnessAggregates,
  } from "@/repositories/dashboard-intelligence-repository";
  
  export async function
  getDashboardIntelligence():
  Promise<DashboardIntelligence> {
  
    const [counts, wellness] =
      await Promise.all([
        getDashboardCounts(),
        getWellnessAggregates(),
      ]);
  
    return {
      totalUsers:
        counts.totalUsers,
  
      activeUsers:
        counts.totalUsers,
  
      aiSessions:
        counts.aiSessions,
  
      riskAlerts:
        wellness.riskAlerts,
  
      averageWellnessScore:
        wellness.averageWellnessScore,
  
      highRiskUsers:
        wellness.highRiskUsers,
  
      dominantEmotion:
        wellness.dominantEmotion,
  
      totalHumanTwins:
        counts.totalHumanTwins,
  
      totalInstitutions:
        counts.totalInstitutions,
  
      totalSchools:
        counts.totalSchools,
  
      lastUpdated:
        new Date()
          .toISOString(),
    };
  }
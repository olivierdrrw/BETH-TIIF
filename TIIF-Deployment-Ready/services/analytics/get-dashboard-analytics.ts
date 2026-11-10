import {
    DashboardAnalytics,
  }
  from "@/types/analytics";
  
  import {
    getTotalUsers,
  }
  from "@/repositories/analytics-repository";
  
  export async function
  getDashboardAnalytics():
  Promise<DashboardAnalytics> {
  
    try {
      const totalUsers =
        await getTotalUsers();
  
      return {
        totalUsers,
        activeUsers:
          totalUsers,
        aiSessions: 0,
        riskAlerts: 0,
        averageWellnessScore:
          0,
      };
    } catch (error) {
  
      console.error(
        "Dashboard analytics error:",
        error
      );
  
      return {
        totalUsers: 0,
        activeUsers: 0,
        aiSessions: 0,
        riskAlerts: 0,
        averageWellnessScore:
          0,
      };
    }
  }
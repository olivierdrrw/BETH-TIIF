import {
    DashboardIntelligence,
  } from "@/types/dashboard-intelligence";
  
  export function
  generateInsights(
    data:
      DashboardIntelligence
  ) {
    const insights:
      string[] = [];
  
    if (
      data.totalUsers >
      1000
    ) {
      insights.push(
        "Platform adoption is growing rapidly."
      );
    }
  
    if (
      data.highRiskUsers >
      50
    ) {
      insights.push(
        "High-risk population requires attention."
      );
    }
  
    if (
      data.averageWellnessScore >=
      80
    ) {
      insights.push(
        "National wellness indicators are improving."
      );
    }
  
    if (
      data.aiSessions >
      data.totalUsers
    ) {
      insights.push(
        "AI Companion engagement is strong."
      );
    }
  
    return insights;
  }
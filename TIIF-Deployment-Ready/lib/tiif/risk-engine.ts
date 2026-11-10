import {
    CrisisLevel,
  } from "./crisis-classifier";
  
  export function
  calculateRiskScore(
    level:
      CrisisLevel
  ) {
    switch (
      level
    ) {
      case "none":
        return 0;
  
      case "low":
        return 25;
  
      case "medium":
        return 60;
  
      case "high":
        return 90;
  
      default:
        return 0;
    }
  }
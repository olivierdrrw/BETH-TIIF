import {
    predictNextValue,
  } from "./prediction-engine";
  
  export function
  forecastRisk(
    scores:
      number[]
  ) {
    const prediction =
      predictNextValue(
        scores
      );
  
    return {
      predictedRisk:
        prediction,
  
      level:
        prediction >= 80
          ? "high"
          : prediction >= 50
          ? "medium"
          : "low",
    };
  }
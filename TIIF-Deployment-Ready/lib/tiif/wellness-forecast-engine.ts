import {
    predictNextValue,
  } from "./prediction-engine";
  
  export function
  forecastWellness(
    scores:
      number[]
  ) {
    const prediction =
      predictNextValue(
        scores
      );
  
    return {
      predictedScore:
        prediction,
  
      status:
        prediction >= 70
          ? "healthy"
          : "attention",
    };
  }
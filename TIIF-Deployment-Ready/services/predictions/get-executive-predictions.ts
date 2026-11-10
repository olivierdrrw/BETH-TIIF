import {
    forecastRisk,
  } from "@/lib/tiif/risk-forecast-engine";
  
  import {
    forecastWellness,
  } from "@/lib/tiif/wellness-forecast-engine";
  
  export async function
  getExecutivePredictions(
    wellnessScores:
      number[],
    riskScores:
      number[]
  ) {
    return {
      wellness:
        forecastWellness(
          wellnessScores
        ),
  
      risk:
        forecastRisk(
          riskScores
        ),
    };
  }
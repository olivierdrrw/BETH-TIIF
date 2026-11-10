import {
    getExecutivePredictions,
  } from "./get-executive-predictions";
  
  export async function
  getForecastAnalytics(
    wellnessScores:
      number[],
    riskScores:
      number[]
  ) {
    const predictions =
      await getExecutivePredictions(
        wellnessScores,
        riskScores
      );
  
    return {
      predictions,
      generatedAt:
        new Date()
          .toISOString(),
    };
  }
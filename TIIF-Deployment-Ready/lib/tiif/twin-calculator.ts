interface TwinScores {
    growthScore: number;
    resilienceScore: number;
    wellnessScore: number;
  }
  
  export function calculateTwin(
    totalReflections: number,
    resilienceScore: number
  ): TwinScores {
    const growthScore = Math.min(
      100,
      totalReflections * 2
    );
  
    const wellnessScore =
      Math.round(
        (
          growthScore +
          resilienceScore
        ) / 2
      );
  
    return {
      growthScore,
      resilienceScore,
      wellnessScore,
    };
  }
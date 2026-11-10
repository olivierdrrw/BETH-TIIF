export function calculatePotentialSelf({

  identityScore,

  growthScore,

  wellbeingScore,

  resilienceScore,

  goalsProgress,

}: any) {

  return {

    confidence:
      Math.round(
        (
          identityScore +
          resilienceScore
        ) / 2
      ),

    wellbeing:
      wellbeingScore,

    impact:
      Math.round(
        (
          growthScore +
          goalsProgress
        ) / 2
      ),

    purpose:
      Math.round(
        (
          identityScore +
          goalsProgress
        ) / 2
      ),

    leadership:
      Math.round(
        growthScore * 0.9
      ),

    resilience:
      resilienceScore,

  };
}
export function generateHumanTwin({

  traumaScore,

  identityScore,

  purposeScore,

  wellbeingScore,

  resilienceScore,

}: any) {

  const growthScore =
    Math.round(
      (
        identityScore +
        purposeScore +
        resilienceScore
      ) / 3
    );

  const impactScore =
    Math.round(
      (
        growthScore +
        wellbeingScore
      ) / 2
    );

  return {

    traumaScore,

    identityScore,

    purposeScore,

    wellbeingScore,

    resilienceScore,

    growthScore,

    impactScore,

  };
}
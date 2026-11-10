export function generateHumanTwin({

  traumaScore,

  identityScore,

  moodScore,

  journalConsistency,

  goalsProgress,

}: any) {

  const wellbeingScore =
    Math.round(
      (
        moodScore +
        journalConsistency +
        goalsProgress
      ) / 3
    );

  const growthScore =
    Math.round(
      (
        identityScore +
        goalsProgress
      ) / 2
    );

  const impactScore =
    Math.round(
      (
        wellbeingScore +
        growthScore
      ) / 2
    );

  return {

    traumaScore,

    identityScore,

    wellbeingScore,

    growthScore,

    impactScore,

  };
}
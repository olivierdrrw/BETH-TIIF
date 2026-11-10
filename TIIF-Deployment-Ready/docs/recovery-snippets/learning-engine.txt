export function calculateLearningScore(
  profile: LearningProfile
) {
  return Math.round(
    (
      profile.focusScore +
      profile.consistencyScore +
      profile.masteryScore +
      profile.curiosityScore
    ) / 4
  );
}
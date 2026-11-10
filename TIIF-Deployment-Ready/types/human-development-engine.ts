import {
  HumanDevelopmentProfile,
} from "./human-development";

export function calculateHumanDevelopment(
  profile:
    HumanDevelopmentProfile
) {
  return Math.round(
    (
      profile.identity +
      profile.wellbeing +
      profile.growth +
      profile.resilience +
      profile.purpose +
      profile.connection
    ) / 6
  );
}
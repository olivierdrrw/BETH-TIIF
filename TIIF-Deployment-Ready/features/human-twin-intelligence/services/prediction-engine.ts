import { HumanTwin } from "@/types/human-twin";

export function predictHumanTwin(
  twin: HumanTwin
) {

  const current =
    Math.round(
      (
        twin.identityScore +
        twin.growthScore +
        twin.wellbeingScore +
        twin.purposeScore
      ) / 4
    );

  const projected30Days =
    Math.min(
      current + 5,
      100
    );

  const projected90Days =
    Math.min(
      current + 12,
      100
    );

  return {
    projected30Days,
    projected90Days,
  };
}
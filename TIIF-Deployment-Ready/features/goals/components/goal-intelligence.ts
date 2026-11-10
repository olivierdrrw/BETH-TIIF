import { Goal } from "../types/goal";

export function getGoalInsight(
  goals: Goal[]
) {

  const completed =
    goals.filter(
      (goal) =>
        goal.status ===
        "completed"
    ).length;

  if (completed >= 5) {

    return {
      title:
        "Momentum Building",
      description:
        "You consistently complete goals.",
    };
  }

  return {
    title:
      "Growth Opportunity",
    description:
      "Focus on completing one goal this week.",
  };
}
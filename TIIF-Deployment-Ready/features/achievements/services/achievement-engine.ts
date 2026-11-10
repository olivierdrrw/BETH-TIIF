import { Achievement }
from "../types/achievement";

export function generateAchievements(
  journalCount: number,
  goalCount: number,
  impactScore: number
): Achievement[] {

  return [

    {
      id: "first-journal",
      title: "First Reflection",
      description:
        "Created your first journal entry.",
      icon: "📖",
      category: "journal",
      unlocked:
        journalCount >= 1,
    },

    {
      id: "goal-starter",
      title: "Goal Starter",
      description:
        "Created your first goal.",
      icon: "🎯",
      category: "growth",
      unlocked:
        goalCount >= 1,
    },

    {
      id: "impact-70",
      title: "Growing Strong",
      description:
        "Reached Impact Score 70.",
      icon: "🚀",
      category: "growth",
      unlocked:
        impactScore >= 70,
    },
  ];
}
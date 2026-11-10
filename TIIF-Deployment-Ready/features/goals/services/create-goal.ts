import { GoalRepository }
from "../repositories/goal-repository";

export async function createGoal({

  title,
  description,
  category,
  userId,

}: any) {

  return GoalRepository.create({

    title,

    description,

    category,

    userId,

    progress: 0,

    completed: false,

    createdAt:
      new Date().toISOString(),

  });
}
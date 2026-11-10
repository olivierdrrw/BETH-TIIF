import { GoalRepository }
from "../repositories/goal-repository";

export async function completeGoal(
  goalId: string
) {

  await GoalRepository.update(
    goalId,
    {
      completed: true,
      progress: 100,
    }
  );
}
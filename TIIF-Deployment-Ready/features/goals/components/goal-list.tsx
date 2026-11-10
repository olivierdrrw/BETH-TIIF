"use client";

import { Goal }
from "../types/goal";

export function GoalList({
  goals,
}: {
  goals: Goal[];
}) {

  return (

    <div
      className="
      grid
      gap-4
      "
    >

      {goals.map(
        (goal) => (

          <div
            key={goal.id}
            className="
            rounded-2xl
            border
            border-zinc-800
            p-5
            "
          >

            <h3>
              {goal.title}
            </h3>

            <p>
              {goal.progress}%
            </p>

          </div>

        )
      )}

    </div>

  );
}
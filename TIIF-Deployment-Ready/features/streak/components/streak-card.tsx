import { Flame } from "lucide-react";

export function StreakCard({

  streak,

}: {
  streak: number;
}) {

  return (

    <div
      className="
      rounded-3xl
      border
      p-6
      "
    >

      <h2 className="flex items-center gap-2">
        <Flame className="h-5 w-5 text-navy-400" aria-hidden="true" />
        {streak}
      </h2>

      <p>
        Day Streak
      </p>

    </div>

  );
}
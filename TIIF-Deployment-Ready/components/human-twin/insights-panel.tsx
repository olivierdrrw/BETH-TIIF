"use client";

export function InsightsPanel() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-navy-500/20
        bg-navy-500/5
        p-6
      "
    >
      <h3 className="font-semibold">
        Human Twin Insights
      </h3>

      <ul
        className="
          mt-4
          space-y-3
          text-zinc-300
        "
      >
        <li>
          Journaling consistency
          improved by 14%
        </li>

        <li>
          Stress reflections
          decreased this month
        </li>

        <li>
          Purpose clarity is
          increasing steadily
        </li>
      </ul>
    </div>
  );
}
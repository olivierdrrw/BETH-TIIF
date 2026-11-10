"use client";

export function RecommendationsPanel() {
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
        Recommendations
      </h3>

      <ul
        className="
          mt-4
          space-y-3
        "
      >
        <li>
          Explore purpose
          reflections
        </li>

        <li>
          Continue daily journaling
        </li>

        <li>
          Schedule a growth review
        </li>
      </ul>
    </div>
  );
}
"use client";

import {
  useHumanTwinStore,
}
from "@/stores/human-twin-store";

export function HumanTwinCard() {

  const {
    twin,
  } = useHumanTwinStore();

  if (!twin) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  return (

    <div
      className="
      rounded-3xl
      border
      border-zinc-800
      p-6
      "
    >

      <h2
        className="
        text-3xl
        font-bold
        "
      >
        Human Twin
      </h2>

      <p>
        Level:
        {" "}
        {twin.currentLevel ?? 1}
      </p>

      <p>
        Identity:
        {" "}
        {twin.identityScore ?? 0}
      </p>

      <p>
        Growth:
        {" "}
        {twin.growthScore ?? 0}
      </p>

      <p>
        Impact:
        {" "}
        {twin.impactScore ?? 0}
      </p>

    </div>

  );
}
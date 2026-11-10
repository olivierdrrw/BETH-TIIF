"use client";

import {
  useHumanTwinStore,
}
from "../store/human-twin-store";

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
        {twin.level}
      </p>

      <p>
        Identity:
        {" "}
        {twin.identityScore}
      </p>

      <p>
        Growth:
        {" "}
        {twin.growthScore}
      </p>

      <p>
        Impact:
        {" "}
        {twin.impactScore}
      </p>

    </div>

  );
}
"use client";

import LivingOrb from "@/components/human-twin/living-orb";

export default function HeroOrb() {
  return (
    <div className="flex flex-col items-center">

      <LivingOrb size={240} />

      <h2 className="mt-8 text-4xl font-bold">

        Human Twin™

      </h2>

      <p className="mt-3 text-slate-400">

        Living Identity Intelligence

      </p>

    </div>
  );
}
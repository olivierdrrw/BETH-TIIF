"use client";

import { Lightbulb } from "lucide-react";

export default function AIRecommendation() {
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

      <div className="flex items-center gap-3">

        <Lightbulb className="text-navy-400"/>

        <h3 className="font-semibold">

          Recommendation

        </h3>

      </div>

      <p className="mt-4 leading-8 text-slate-300">

        Schedule a 10 minute reflection
        session before bedtime today.

      </p>

    </div>

  );
}
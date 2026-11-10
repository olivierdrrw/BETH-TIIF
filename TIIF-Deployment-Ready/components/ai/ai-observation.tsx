"use client";

import { Eye } from "lucide-react";

export default function AIObservation() {
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

        <Eye className="text-navy-400"/>

        <h3 className="font-semibold">

          Observation

        </h3>

      </div>

      <p className="mt-4 leading-8 text-slate-300">

        Your check-ins have been more consistent
        this week, and your mood has stayed steady
        through the evenings.

      </p>

    </div>

  );
}

"use client";

import { BrainCircuit } from "lucide-react";
import { StatusPill } from "@/components/dashboard/ui/status-pill";

export default function AIHeader() {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-navy-500/10
            text-navy-400
          "
        >
          <BrainCircuit size={22} />
        </div>

        <div>

          <p className="text-xs uppercase tracking-[0.3em] text-navy-400">
            AI COMPANION™
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            Human Development Intelligence
          </h2>

        </div>

      </div>

      <StatusPill>

        Context Aware

      </StatusPill>

    </div>
  );
}
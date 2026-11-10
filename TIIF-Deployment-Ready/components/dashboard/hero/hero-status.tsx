"use client";

import { StatusPill } from "@/components/dashboard/ui/status-pill";

export default function HeroStatus() {
  return (
    <div className="flex flex-wrap gap-3">

      <StatusPill>
        Human Twin Active
      </StatusPill>

      <StatusPill>
        AI Learning
      </StatusPill>

      <StatusPill>
        Live Monitoring
      </StatusPill>

    </div>
  );
}
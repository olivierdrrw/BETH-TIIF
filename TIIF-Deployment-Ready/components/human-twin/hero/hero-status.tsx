"use client";

import { StatusPill } from "@/components/dashboard/ui/status-pill";

export default function HeroStatus() {
  return (
    <div className="flex justify-center gap-4">

      <StatusPill>

        LIVE

      </StatusPill>

      <StatusPill>

        Learning

      </StatusPill>

      <StatusPill>

        Synced

      </StatusPill>

    </div>
  );
}
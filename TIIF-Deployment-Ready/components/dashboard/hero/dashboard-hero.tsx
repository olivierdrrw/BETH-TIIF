"use client";

import Greeting from "./greeting";
import LiveClock from "./live-clock";
import LiveStatus from "./live-status";
import AISummary from "./ai-summary";
import QuickActions from "./quick-actions";

import DashboardCard from "@/components/ui/dashboard-card";
import HumanTwinCard from "@/features/human-twin/components/hero/human-twin-card";

export default function DashboardHero() {
  return (
    <DashboardCard
      className="
        relative
        overflow-hidden
        rounded-[36px]
        px-10
        py-10
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -top-44
        left-1/2
        h-[700px]
        w-[700px]
        -translate-x-1/2
        rounded-full
        bg-navy-500/10
        blur-[180px]
      "
      />

      <div className="relative z-10">

        {/* Header */}

        <div className="flex items-start justify-between">

          <Greeting />

          <div className="flex items-center gap-4">

            <LiveStatus />

            <LiveClock />

          </div>

        </div>

        {/* Main */}

        <div className="mt-12 grid gap-8 xl:grid-cols-[1.2fr_420px]">

          <div className="space-y-8">

            <AISummary />

            <QuickActions />

          </div>

          <HumanTwinCard />

        </div>

      </div>

    </DashboardCard>
  );
}
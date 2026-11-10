"use client";

import DashboardCard from "@/components/ui/dashboard-card";

import HeroOrb from "./hero-orb";
import HeroMetrics from "./hero-metrics";
import HeroStory from "./hero-story";
import HeroStatus from "./hero-status";
import HeroActions from "./hero-actions";

export default function HumanTwinHero() {
  return (
    <DashboardCard className="relative overflow-hidden p-12">

      <HeroStatus />

      <div className="mt-14">

        <HeroOrb />

      </div>

      <div className="mt-14">

        <HeroMetrics />

      </div>

      <div className="mt-12">

        <HeroStory />

      </div>

      <div className="mt-10">

        <HeroActions />

      </div>

    </DashboardCard>
  );
}
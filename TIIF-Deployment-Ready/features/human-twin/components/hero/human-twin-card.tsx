"use client";

import DashboardCard from "@/components/ui/dashboard-card";

import LivingOrb from "@/components/human-twin/living-orb";

import IdentityScore from "./identity-score";
import EmotionalState from "./emotional-state";
import GrowthScore from "./growth-score";
import ResilienceScore from "./resilience-score";
import AIConfidence from "./ai-confidence";
import SyncStatus from "./sync-status";

export default function HumanTwinCard() {
  return (
    <DashboardCard className="relative overflow-hidden p-8">

      {/* Ambient Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle,#5D85D110,transparent_70%)]" />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-[0.35em] text-navy-400">
              HUMAN TWIN™
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Living Identity
            </h2>

          </div>

          <SyncStatus />

        </div>

        <div className="mt-10 flex justify-center">

          <LivingOrb size={220} />

        </div>

        <div className="mt-10 grid grid-cols-2 gap-5">

          <IdentityScore />

          <GrowthScore />

          <EmotionalState />

          <ResilienceScore />

        </div>

        <div className="mt-8">

          <AIConfidence />

        </div>

      </div>

    </DashboardCard>
  );
}
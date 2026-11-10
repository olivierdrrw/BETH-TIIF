"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { DashboardBadge } from "@/components/ui/dashboard-badge";
import { DashboardMetric } from "@/components/ui/dashboard-metric";
import LivingOrb from "@/components/human-twin/living-orb";
import { AIWriting } from "@/components/ai/ai-typing";
import { Floating } from "@/components/motion/floating";

export default function DashboardPreview() {
  return (
    <Floating>
      <DashboardCard className="relative overflow-hidden">

        <div className="absolute right-6 top-6">
          <DashboardBadge>
            LIVE
          </DashboardBadge>
        </div>

        <div className="mb-10">

          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Today's Story
          </p>

          <h2 className="mt-4 text-3xl font-semibold">
            Good Morning
          </h2>

          <p className="mt-3 max-w-md text-slate-400">
            Your Human Twin continues to evolve.
          </p>

        </div>

        <div className="flex justify-center py-6">
          <LivingOrb />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4">

          <DashboardMetric
            title="Identity"
            value={92}
          />

          <DashboardMetric
            title="Wellbeing"
            value={84}
          />

          <DashboardMetric
            title="Purpose"
            value={89}
          />

          <DashboardMetric
            title="Growth"
            value={76}
          />

        </div>

        <div className="mt-10 rounded-3xl border border-white/5 bg-white/[0.03] p-5">

          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-slate-400">
            AI Companion
          </p>

          <AIWriting />

        </div>

      </DashboardCard>
    </Floating>
  );
}
"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatusPill } from "@/components/dashboard/ui/status-pill";
import DNAScore from "./dna-score";
import DNAInsight from "./dna-insight";

export default function IdentityDNA() {
  return (
    <DashboardCard className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.3em] text-navy-400">
            IDENTITY DNA™
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Your Identity Blueprint
          </h2>

        </div>

        <StatusPill>

          Live Analysis

        </StatusPill>

      </div>

      <DNAScore title="Purpose" value={94} />

      <DNAScore title="Identity" value={91} />

      <DNAScore title="Relationships" value={82} />

      <DNAScore title="Health" value={86} />

      <DNAScore title="Learning" value={89} />

      <DNAScore title="Resilience" value={92} />

      <DNAInsight />

    </DashboardCard>
  );
}
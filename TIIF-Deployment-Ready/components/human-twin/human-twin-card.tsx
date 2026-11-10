"use client";

import LivingOrb from "./living-orb";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { DashboardStat } from "@/components/dashboard/ui/dashboard-stat";
import { StatusPill } from "@/components/dashboard/ui/status-pill";
import { ProgressBar } from "@/components/dashboard/ui/progress-bar";
import { PremiumButton } from "@/components/ui/premium-button";
import { Sparkles, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

export default function HumanTwinCard() {
  return (
    <DashboardCard className="relative overflow-hidden">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.35em] text-navy-400">
            HUMAN TWIN™
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Your Digital Self
          </h2>

        </div>

        <StatusPill>
          Synced
        </StatusPill>

      </div>

      <div className="mt-12 flex justify-center">

        <LivingOrb />

      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">

        <DashboardStat
          title="Identity"
          value={92}
        />

        <DashboardStat
          title="Resilience"
          value={88}
        />

        <DashboardStat
          title="Growth"
          value={76}
        />

        <DashboardStat
          title="Purpose"
          value={90}
        />

      </div>

      <div className="mt-10 space-y-6">

        <div>

          <div className="mb-2 flex justify-between">

            <span>AI Confidence</span>

            <span>97%</span>

          </div>

          <ProgressBar value={97} />

        </div>

        <div>

          <div className="mb-2 flex justify-between">

            <span>Emotion Stability</span>

            <span>89%</span>

          </div>

          <ProgressBar value={89} />

        </div>

        <div>

          <div className="mb-2 flex justify-between">

            <span>Purpose Alignment</span>

            <span>93%</span>

          </div>

          <ProgressBar value={93} />

        </div>

      </div>

      <motion.div

        className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6"

        animate={{
          borderColor:[
            "rgba(255,255,255,.08)",
            "rgba(93, 133, 209,.30)",
            "rgba(255,255,255,.08)"
          ]
        }}

        transition={{
          duration:5,
          repeat:Infinity,
        }}

      >

        <div className="flex items-center gap-3">

          <BrainCircuit className="text-navy-400"/>

          <h3 className="font-semibold">
            AI Reflection
          </h3>

        </div>

        <p className="mt-4 leading-8 text-slate-400">

          During the past week your Human Twin detected
          stronger emotional resilience and improved
          consistency across your personal growth journey.

        </p>

      </motion.div>

      <div className="mt-8">

        <PremiumButton>

          <Sparkles className="mr-2 h-4 w-4"/>

          Open Human Twin

        </PremiumButton>

      </div>

    </DashboardCard>
  );
}
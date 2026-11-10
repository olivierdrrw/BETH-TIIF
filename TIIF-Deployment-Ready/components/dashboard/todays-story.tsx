"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatusPill } from "@/components/dashboard/ui/status-pill";
import { DashboardStat } from "@/components/dashboard/ui/dashboard-stat";
import { PremiumButton } from "@/components/ui/premium-button";
import { Sparkles, ArrowRight } from "lucide-react";
import LivingOrb from "@/components/human-twin/living-orb";
import { AIWriting } from "@/components/ai/ai-typing";
import { motion } from "framer-motion";

export function TodaysStory() {
  return (
    <DashboardCard className="relative overflow-hidden">

      <div className="absolute right-8 top-8">
        <StatusPill>
          LIVE
        </StatusPill>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">

        {/* LEFT */}

        <div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >

            <p className="text-sm uppercase tracking-[0.35em] text-navy-400">
              TODAY'S STORY
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight">

              Good Morning,

              <br />

              Olivier

            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">

              Your Human Twin continued learning while you were away.

              Identity confidence increased and your wellbeing remains
              stable.

            </p>

          </motion.div>

          <div className="mt-10">

            <AIWriting />

          </div>

          <div className="mt-10">

            <PremiumButton>

              Continue Journey

              <ArrowRight className="ml-2 h-4 w-4"/>

            </PremiumButton>

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <div className="flex justify-center">

            <LivingOrb />

          </div>

          <div className="mt-10 grid gap-4">

            <DashboardStat
              title="Identity"
              value={92}
            />

            <DashboardStat
              title="Wellbeing"
              value={84}
            />

            <DashboardStat
              title="Purpose"
              value={89}
            />

            <DashboardStat
              title="Growth"
              value={77}
            />

          </div>

        </div>

      </div>

      <motion.div

        className="absolute bottom-6 right-6 flex items-center gap-2 text-navy-300"

        animate={{
          opacity: [0.4,1,0.4],
        }}

        transition={{
          repeat:Infinity,
          duration:2,
        }}

      >

        <Sparkles className="h-4 w-4"/>

        <span className="text-sm">

          AI updated a few seconds ago

        </span>

      </motion.div>

    </DashboardCard>
  );
}

export default TodaysStory;
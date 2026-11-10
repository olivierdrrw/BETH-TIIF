"use client";

import { motion } from "framer-motion";
import LivingOrb from "@/components/human-twin/living-orb";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { DashboardBadge } from "@/components/ui/dashboard-badge";
import { HumanTwinStats } from "./HumanTwinStats";
import { HumanTwinMood } from "./HumanTwinMood";
import { HumanTwinAIStatus } from "./HumanTwinAIStatus";
import { HumanTwinPrediction } from "./HumanTwinPrediction";

export function HumanTwinCard() {
  return (
    <DashboardCard className="relative overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-500/10 via-navy-500/5 to-transparent" />

      {/* Moving Glow */}
      <motion.div
        className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-navy-400/10 blur-[120px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10">

        <DashboardBadge>
          Human Twin™
        </DashboardBadge>

        <div className="mt-8 flex justify-center">
          <LivingOrb />
        </div>

        <div className="mt-10 space-y-8">

          <HumanTwinStats />

          <HumanTwinMood />

          <HumanTwinAIStatus />

          <HumanTwinPrediction />

        </div>

      </div>

    </DashboardCard>
  );
}

export default HumanTwinCard;
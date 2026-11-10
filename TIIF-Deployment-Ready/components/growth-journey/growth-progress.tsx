"use client";

import { motion } from "framer-motion";
import { useHumanTwin } from "@/hooks/use-human-twin";

export function GrowthProgress() {
  const { growth } = useHumanTwin();

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Growth Score</h3>
        <span className="text-3xl font-bold text-white">{growth}%</span>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${growth}%` }}
          transition={{ duration: 1.5 }}
          className="h-full rounded-full bg-gradient-to-r from-navy-400 to-navy-400"
        />
      </div>
    </div>
  );
}

"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useHumanTwin } from "@/hooks/use-human-twin";

export function EmotionSignalsCard() {
  const { emotionalState, wellbeing, resilience } = useHumanTwin();

  const signals = [emotionalState];
  if (wellbeing >= 70) signals.push("Steady");
  if (resilience >= 70) signals.push("Resilient");
  if (signals.length === 1) signals.push("Adjusting");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="rounded-3xl border border-white/10 bg-white/[0.02] p-6"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-500/10 text-navy-400">
          <Heart size={16} />
        </div>
        <h3 className="font-semibold text-white">Emotional Signals</h3>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {signals.map((signal) => (
          <span
            key={signal}
            className="rounded-full bg-navy-500/10 px-3 py-1 text-xs font-medium text-navy-300"
          >
            {signal}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

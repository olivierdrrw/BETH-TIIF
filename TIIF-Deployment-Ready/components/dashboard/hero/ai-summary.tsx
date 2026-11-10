"use client";

import { Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function AISummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-navy-500/15
        bg-gradient-to-br
        from-navy-500/10
        via-slate-900/40
        to-slate-950/70
        p-8
        backdrop-blur-2xl
      "
    >
      {/* Ambient Glow */}
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-navy-500/10 blur-[120px]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-navy-400" />

          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-navy-400">
            AI INSIGHT
          </span>
        </div>

        <h3 className="mt-6 text-3xl font-bold">
          Your Human Twin is improving.
        </h3>

        <p className="mt-5 max-w-2xl leading-8 text-slate-300">
          Emotional consistency increased during the past
          week. Your resilience trend is positive and your
          wellbeing score is expected to improve if today's
          routine continues.
        </p>

        <div className="mt-8 flex items-center gap-3 text-navy-400">
          <TrendingUp className="h-5 w-5" />

          <span className="font-medium">
            Predicted Growth +6%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
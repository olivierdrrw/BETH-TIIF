"use client";

import { motion } from "framer-motion";

export function AiInsightSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border bg-card/60 p-6 backdrop-blur-sm md:p-8"
    >
      {/* Ambient Glow */}
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-2 inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
          AI Companion™
        </div>

        <h2 className="text-2xl font-semibold tracking-tight">
          Today's Insight
        </h2>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Your recent reflections suggest growing self-awareness and emotional
          resilience. Small, consistent actions are contributing to meaningful
          progress across your wellbeing journey.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">
              Reflection Quality
            </p>
            <p className="mt-2 text-2xl font-semibold">
              82%
            </p>
          </div>

          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">
              Emotional Awareness
            </p>
            <p className="mt-2 text-2xl font-semibold">
              Strong
            </p>
          </div>

          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">
              Next Growth Focus
            </p>
            <p className="mt-2 text-2xl font-semibold">
              Consistency
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default AiInsightSection;
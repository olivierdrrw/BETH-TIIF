"use client";

import { motion } from "framer-motion";

export function NextActionSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border bg-card/60 p-6 backdrop-blur-sm md:p-8"
    >
      <div className="mb-2 inline-flex rounded-full border px-3 py-1 text-xs text-muted-foreground">
        Next Action™
      </div>

      <h2 className="text-2xl font-semibold tracking-tight">
        Recommended Next Step
      </h2>

      <p className="mt-3 text-muted-foreground">
        Based on your recent reflections and wellbeing patterns,
        your next growth opportunity is strengthening daily
        self-awareness and consistency.
      </p>

      <div className="mt-6 rounded-2xl border p-5">
        <h3 className="font-medium">
          Today's Action
        </h3>

        <p className="mt-2 text-muted-foreground">
          Spend 10 minutes journaling about a recent challenge
          and identify one lesson you learned from it.
        </p>
      </div>
    </motion.section>
  );
}

export default NextActionSection;
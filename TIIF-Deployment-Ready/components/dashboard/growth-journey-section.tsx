"use client";

import { motion } from "framer-motion";

export function GrowthJourneySection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border bg-card/60 p-6 backdrop-blur-sm md:p-8"
    >
      <div className="mb-2 inline-flex rounded-full border px-3 py-1 text-xs text-muted-foreground">
        Growth Journey™
      </div>

      <h2 className="text-2xl font-semibold tracking-tight">
        Your Progress
      </h2>

      <p className="mt-3 text-muted-foreground">
        Follow your journey from awareness to healing, growth and thriving.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        {[
          "Understand",
          "Support",
          "Heal",
          "Grow",
          "Thrive",
        ].map((step, index) => (
          <div
            key={step}
            className="flex min-w-[120px] flex-col items-center rounded-2xl border p-4"
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border">
              {index + 1}
            </div>

            <span className="text-sm font-medium">
              {step}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default GrowthJourneySection;
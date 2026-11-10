"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CountUp({ value, duration = 1100 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <>{display}</>;
}

export function HumanTwinSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border bg-card/60 p-6 backdrop-blur-sm md:p-8"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

      {/* faint abstract geometric accent — a quiet nod to Rwandan geometric linework, not a literal reproduction */}
      <svg
        className="pointer-events-none absolute right-0 top-0 h-32 w-32 opacity-[0.07]"
        viewBox="0 0 120 120"
        fill="none"
        stroke="var(--navy-300)"
        strokeWidth="1"
      >
        <path d="M120 0L80 40L120 80M120 0L60 60M40 0L0 40L40 80M0 0L40 40M40 80L80 120M0 80L40 120" />
      </svg>

      <div className="relative z-10">
        <div className="mb-2 inline-flex rounded-full border px-3 py-1 text-xs text-muted-foreground">
          Human Twin™
        </div>

        <h2 className="text-2xl font-semibold tracking-tight">Your Digital Reflection</h2>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Human Twin™ continuously learns from your reflections, wellbeing patterns, growth
          journey and personal goals to build a living representation of your development.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Identity Clarity</p>
            <p className="mt-2 text-3xl font-semibold">
              <CountUp value={78} />%
            </p>
          </div>

          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Resilience</p>
            <p className="mt-2 text-3xl font-semibold">
              <CountUp value={84} />%
            </p>
          </div>

          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Growth Score™</p>
            <p className="mt-2 text-3xl font-semibold">
              <CountUp value={81} />
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default HumanTwinSection;

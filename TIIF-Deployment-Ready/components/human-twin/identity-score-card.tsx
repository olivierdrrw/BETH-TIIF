"use client";

import { motion } from "framer-motion";

export function IdentityScoreCard() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
      rounded-3xl
      border
      border-border
      bg-surface
      p-6
      "
    >
      <p
        className="
        text-sm
        text-muted-foreground
      "
      >
        Identity
      </p>

      <h2
        className="
        mt-3
        text-4xl
        font-bold
        "
      >
        82
      </h2>

      <p
        className="
        mt-2
        text-sm
        text-navy-500
        "
      >
        +4 this month
      </p>
    </motion.div>
  );
}
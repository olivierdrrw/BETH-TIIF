"use client";

import { motion } from "framer-motion";

export function HumanTwinOrb() {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          h-56
          w-56
          rounded-full
          bg-gradient-to-br
          from-navy-500
          via-navy-500
          to-navy-400
          blur-[1px]
        "
      />

      <div
        className="
          absolute
          text-center
          text-white
        "
      >
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
          Human Twin
        </p>

        <h2 className="mt-2 text-3xl font-semibold">
          82%
        </h2>
      </div>
    </div>
  );
}
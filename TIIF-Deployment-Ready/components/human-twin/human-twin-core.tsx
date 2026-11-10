// components/human-twin/human-twin-core.tsx

"use client";

import { motion } from "framer-motion";

export function HumanTwinCore() {
  return (
    <div
      className="
      flex
      justify-center
      py-12
      "
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="
        h-48
        w-48
        rounded-full
        bg-primary/20
        blur-sm
        "
      />
    </div>
  );
}
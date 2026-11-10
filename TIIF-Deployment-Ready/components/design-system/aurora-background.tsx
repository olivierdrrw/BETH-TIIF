"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div
      className="
      absolute
      inset-0
      overflow-hidden
      -z-10
      "
    >
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
        absolute
        h-[600px]
        w-[600px]
        rounded-full
        bg-primary/10
        blur-3xl
        "
      />
    </div>
  );
}
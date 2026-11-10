"use client";

import { motion } from "framer-motion";

export function OrbCore() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.04, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
      }}
      className="
      h-56
      w-56
      rounded-full
      bg-primary/20
      backdrop-blur-xl
      "
    />
  );
}
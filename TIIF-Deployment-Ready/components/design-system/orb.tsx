"use client";

import { motion } from "framer-motion";

export function Orb() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
      }}
      className="
      h-52
      w-52
      rounded-full
      bg-primary/20
      blur-xl
      "
    />
  );
}
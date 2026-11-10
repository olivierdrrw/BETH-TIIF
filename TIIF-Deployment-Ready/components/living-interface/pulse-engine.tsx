"use client";

import { motion } from "framer-motion";

export default function PulseEngine() {
  return (
    <motion.div
      className="
      pointer-events-none
      fixed
      inset-0
      z-0
      rounded-full
    "
      animate={{
        opacity: [0.05, 0.12, 0.05],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
    />
  );
}
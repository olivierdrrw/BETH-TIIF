"use client";

import { motion } from "framer-motion";

export default function HumanTwinOrb() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex h-52 w-52 items-center justify-center rounded-full"
      >
        <div className="absolute h-52 w-52 rounded-full bg-navy-500/20 blur-3xl" />

        <div className="absolute h-44 w-44 rounded-full border border-navy-400/40" />

        <div className="absolute h-36 w-36 rounded-full border border-navy-500/50" />

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-navy-400 to-navy-600 text-xl font-bold text-white shadow-2xl">
          TIIF
        </div>
      </motion.div>
    </div>
  );
}
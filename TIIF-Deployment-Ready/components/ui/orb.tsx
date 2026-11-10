"use client";

import { motion } from "framer-motion";

export function Orb() {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="absolute h-72 w-72 rounded-full bg-navy-500/10 blur-[100px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="relative h-40 w-40 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-navy-500/20 via-transparent to-navy-500/10" />
      </motion.div>
    </div>
  );
}
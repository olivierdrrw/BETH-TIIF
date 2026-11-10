"use client";

import { motion } from "framer-motion";

export function AIOrb() {
  return (
    <div className="relative flex items-center justify-center">

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          h-48
          w-48
          rounded-full
          bg-gradient-to-br
          from-navy-500
          via-navy-500
          to-navy-400
          blur-sm
        "
      />

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-56
          w-56
          rounded-full
          border
          border-white/10
        "
      />

    </div>
  );
}
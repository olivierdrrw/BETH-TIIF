"use client";

import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      <motion.div
        className="
          absolute
          left-1/2
          top-[-20rem]
          h-[55rem]
          w-[55rem]
          -translate-x-1/2
          rounded-full
          bg-gradient-to-br
          from-navy-600/20
          via-navy-400/10
          to-transparent
          blur-[120px]
        "
        animate={{
          rotate: [0, 360],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="
          absolute
          bottom-[-25rem]
          left-[-15rem]
          h-[45rem]
          w-[45rem]
          rounded-full
          bg-navy-500/10
          blur-[140px]
        "
        animate={{
          x: [0, 120, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          absolute
          right-[-18rem]
          top-[30%]
          h-[40rem]
          w-[40rem]
          rounded-full
          bg-navy-700/10
          blur-[150px]
        "
        animate={{
          x: [0, -90, 0],
          y: [0, 70, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </div>
  );
}
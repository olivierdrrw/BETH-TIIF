"use client";

import { motion } from "framer-motion";

export default function AnimatedMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* TOP BLUE */}
      <motion.div
        className="
          absolute
          -left-40
          -top-40
          h-[700px]
          w-[700px]
          rounded-full
          bg-navy-600/10
          blur-[120px]
        "
        animate={{
          x: [0, 80, 0],
          y: [0, 60, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* RIGHT */}
      <motion.div
        className="
          absolute
          right-[-250px]
          top-[20%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-navy-500/8
          blur-[140px]
        "
        animate={{
          x: [0, -70, 0],
          y: [0, -60, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* BOTTOM */}
      <motion.div
        className="
          absolute
          bottom-[-300px]
          left-1/2
          h-[800px]
          w-[800px]
          -translate-x-1/2
          rounded-full
          bg-navy-700/8
          blur-[160px]
        "
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </div>
  );
}
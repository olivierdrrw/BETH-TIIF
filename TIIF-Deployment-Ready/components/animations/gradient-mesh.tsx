"use client";

import { motion } from "framer-motion";

export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      <motion.div
        animate={{
          x: [-50, 50, -50],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/4
          top-1/4
          h-96
          w-96
          rounded-full
          bg-navy-500/20
          blur-3xl
        "
      />

      <motion.div
        animate={{
          x: [50, -50, 50],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-1/4
          bottom-1/4
          h-96
          w-96
          rounded-full
          bg-navy-500/20
          blur-3xl
        "
      />

    </div>
  );
}
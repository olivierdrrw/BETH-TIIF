"use client";

import { motion } from "framer-motion";

export function AmbientLight() {
  return (
    <>
      <motion.div
        className="
        fixed
        -top-40
        left-1/2
        -translate-x-1/2
        h-[700px]
        w-[700px]
        rounded-full
        bg-[#3E63B0]/10
        blur-[180px]
        pointer-events-none
        -z-10
      "
        animate={{
          opacity: [0.25, 0.45, 0.25],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
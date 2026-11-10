"use client";

import { motion } from "framer-motion";

export function Glow() {
  return (
    <>
      <motion.div
        className="
          fixed
          left-[-200px]
          top-[10%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-navy-500/10
          blur-[160px]
          pointer-events-none
        "
        animate={{
          x: [0, 120, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          fixed
          right-[-200px]
          bottom-[5%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-navy-400/10
          blur-[160px]
          pointer-events-none
        "
        animate={{
          x: [0, -120, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}

export default Glow;
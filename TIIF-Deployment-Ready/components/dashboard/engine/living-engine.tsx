"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export function LivingEngine({
  children,
}: Props) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.002, 1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative"
    >
      {children}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[40px]
          bg-[#3E63B0]/[0.03]
          blur-[100px]
        "
        animate={{
          opacity: [.25,.45,.25],
          scale: [1,1.08,1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
"use client";

import { motion } from "framer-motion";

export function OrbCore() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.03, 1],
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
        blur-0
      "
    />
  );
}
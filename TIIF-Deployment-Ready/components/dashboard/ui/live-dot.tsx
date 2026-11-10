"use client";

import { motion } from "framer-motion";

interface LiveDotProps {
  color?: string;
}

export function LiveDot({
  color = "#5D85D1",
}: LiveDotProps) {
  return (
    <div className="relative flex h-3 w-3 items-center justify-center">
      <motion.span
        className="absolute h-3 w-3 rounded-full"
        style={{ background: color }}
        animate={{
          scale: [1, 2.3, 1],
          opacity: [0.8, 0, 0.8],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
      />

      <span
        className="relative h-2.5 w-2.5 rounded-full shadow-lg"
        style={{ background: color }}
      />
    </div>
  );
}
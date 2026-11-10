"use client";

import { motion } from "framer-motion";

export function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {[...Array(12)].map((_, index) => (
        <motion.div
          key={index}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 10 + index,
            repeat: Infinity,
          }}
          className="
            absolute
            h-2
            w-2
            rounded-full
            bg-navy-400/30
          "
          style={{
            left: `${index * 8}%`,
            top: `${index * 6}%`,
          }}
        />
      ))}
    </div>
  );
}
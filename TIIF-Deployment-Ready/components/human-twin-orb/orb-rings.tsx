"use client";

import { motion } from "framer-motion";

export function OrbRings() {
  return (
    <>
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10 + ring,
            repeat: Infinity,
          }}
          className="
          absolute
          rounded-full
          border
          border-white/10
          "
        />
      ))}
    </>
  );
}
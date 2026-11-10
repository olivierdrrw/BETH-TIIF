"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 18 });

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="
            absolute
            rounded-full
            bg-navy-500/30
            blur-[1px]
          "
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -180],
            opacity: [0, .8, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 10 + 12,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear",
          }}
        />
      ))}

    </div>
  );
}
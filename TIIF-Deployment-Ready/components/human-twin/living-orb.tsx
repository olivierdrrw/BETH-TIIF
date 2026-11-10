"use client";

import { motion } from "framer-motion";

interface LivingOrbProps {
  /** Diameter of the visual orb in pixels. Defaults to 256. */
  size?: number;
}

export default function LivingOrb({ size = 256 }: LivingOrbProps) {
  const ring = (multiplier: number) => Math.round(size * multiplier);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label="Animated Human Twin orb"
      role="img"
    >

      {/* OUTER AURA */}

      <motion.div
        className="
          absolute
          rounded-full
          bg-navy-500/10
          blur-[90px]
        "
        style={{ width: ring(1), height: ring(1) }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      {/* DNA RING */}

      <motion.div
        className="
          absolute
          rounded-full
          border
          border-navy-400/20
        "
        style={{ width: ring(0.875), height: ring(0.875) }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* SECOND RING */}

      <motion.div
        className="
          absolute
          rounded-full
          border
          border-navy-300/20
        "
        style={{ width: ring(0.75), height: ring(0.75) }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* CENTER */}

      <motion.div
        className="
          relative


          rounded-full

          bg-gradient-to-br

          from-navy-400

          via-navy-500

          to-navy-600

          shadow-[0_0_70px_rgba(93, 133, 209,.5)]
        "
        style={{ width: ring(0.5), height: ring(0.5) }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <motion.div
          className="
            absolute
            rounded-full

            bg-white/20

            backdrop-blur-xl
          "
          style={{ inset: ring(0.0625) }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>

    </div>
  );
}
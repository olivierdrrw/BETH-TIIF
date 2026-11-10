"use client";

import { motion } from "framer-motion";

export default function LivingOrb() {
  return (
    <div className="relative flex items-center justify-center">

      {/* OUTER AURA */}

      <motion.div
        className="
          absolute
          h-64
          w-64
          rounded-full
          bg-navy-500/10
          blur-[90px]
        "
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
          h-56
          w-56
          rounded-full
          border
          border-navy-400/20
        "
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
          h-48
          w-48
          rounded-full
          border
          border-navy-300/20
        "
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

          h-32
          w-32

          rounded-full

          bg-gradient-to-br

          from-navy-400

          via-navy-500

          to-navy-600

          shadow-[0_0_70px_rgba(93, 133, 209,.5)]
        "
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
            inset-4

            rounded-full

            bg-white/20

            backdrop-blur-xl
          "
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
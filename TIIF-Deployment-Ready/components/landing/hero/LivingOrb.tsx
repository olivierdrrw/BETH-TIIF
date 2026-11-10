"use client";

import { motion } from "framer-motion";

export default function LivingOrb() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Ambient Glow */}

      <motion.div
        className="absolute h-[26rem] w-[26rem] rounded-full bg-navy-500/10 blur-[120px]"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* White Glow */}

      <motion.div
        className="absolute h-[18rem] w-[18rem] rounded-full bg-white/10 blur-[80px]"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orbit */}

      <motion.div
        className="absolute h-80 w-80 rounded-full border border-white/10"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute left-1/2 -top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-navy-300 shadow-[0_0_20px_#5D85D1]" />
      </motion.div>

      {/* Human Twin */}

      <motion.div
        className="
        relative
        h-48
        w-48
        overflow-hidden
        rounded-full
        border
        border-white/10
        bg-white/5
        backdrop-blur-3xl
        shadow-[0_0_80px_rgba(93, 133, 209,0.15)]
        "
        animate={{
          scale: [1, 1.04, 1],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      >
        <div
          className="
          absolute
          inset-0
          bg-gradient-to-br
          from-navy-500/30
          via-white/10
          to-slate-950
          "
        />

        <motion.div
          className="
          absolute
          left-1/2
          top-1/2
          h-20
          w-20
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-navy-300/30
          blur-3xl
          "
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="
          absolute
          inset-4
          rounded-full
          border
          border-white/10
          "
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
}
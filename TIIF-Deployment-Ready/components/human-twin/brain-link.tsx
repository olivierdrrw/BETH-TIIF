"use client";

import { motion } from "framer-motion";

interface Props {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function BrainLink({
  x1,
  y1,
  x2,
  y2,
}: Props) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      <line
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke="rgba(93, 133, 209,.15)"
        strokeWidth="2"
      />

      <motion.circle
        r="3"
        fill="#5D85D1"
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path={`M ${x1}% ${y1}% L ${x2}% ${y2}%`}
        />
      </motion.circle>

    </svg>
  );
}
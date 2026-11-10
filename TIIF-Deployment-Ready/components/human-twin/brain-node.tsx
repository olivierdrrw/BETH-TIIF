"use client";

import { motion } from "framer-motion";

interface Props {
  label: string;
  x: number;
  y: number;
}

export default function BrainNode({
  label,
  x,
  y,
}: Props) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%,-50%)",
      }}
      animate={{
        scale: [1, 1.12, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    >
      <motion.div
        className="
          h-5
          w-5
          rounded-full
          bg-navy-400
          shadow-[0_0_25px_rgba(93, 133, 209,.8)]
        "
        animate={{
          boxShadow: [
            "0 0 20px rgba(93, 133, 209,.4)",
            "0 0 40px rgba(93, 133, 209,.9)",
            "0 0 20px rgba(93, 133, 209,.4)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      <p
        className="
          absolute
          left-8
          top-1/2
          -translate-y-1/2
          whitespace-nowrap
          text-sm
          font-medium
          text-slate-300
        "
      >
        {label}
      </p>

    </motion.div>
  );
}
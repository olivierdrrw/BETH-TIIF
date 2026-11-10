"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  color?: string;
}

export function ProgressBar({
  value,
  className,
  color = "from-navy-500 to-navy-400",
}: ProgressBarProps) {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-white/5",
        className
      )}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{
          duration: 1.4,
          ease: "easeOut",
        }}
        className={cn(
          "relative h-full rounded-full bg-gradient-to-r",
          color
        )}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-white/40 blur-sm"
          animate={{
            opacity: [0.2, 0.8, 0.2],
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
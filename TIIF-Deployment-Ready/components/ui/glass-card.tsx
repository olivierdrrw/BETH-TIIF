"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.015,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className={cn(
        `
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-navy-500/10
        bg-white/60
        backdrop-blur-3xl
        shadow-[0_20px_80px_rgba(38, 61, 112,0.08)]
        dark:bg-white/[0.05]
        dark:border-white/10
        `,
        className
      )}
    >
      {/* top highlight */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/80
          to-transparent
        "
      />

      {/* ambient glow */}
      <div
        className="
          absolute
          -top-20
          left-1/2
          h-52
          w-52
          -translate-x-1/2
          rounded-full
          bg-navy-500/10
          blur-[100px]
        "
      />

      <div className="relative p-8">
        {children}
      </div>
    </motion.div>
  );
}
"use client";

import { motion } from "framer-motion";

interface FloatingProps {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
  className?: string;
}

/**
 * Wraps children in a gentle, continuous up-and-down float — used for hero
 * illustrations and orbs that should feel alive without being distracting.
 */
export function Floating({
  children,
  duration = 4,
  distance = 12,
  className,
}: FloatingProps) {
  return (
    <motion.div
      animate={{ y: [-distance / 2, distance / 2, -distance / 2] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Floating;

"use client";

import { motion } from "framer-motion";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function PageTransition({
  children,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
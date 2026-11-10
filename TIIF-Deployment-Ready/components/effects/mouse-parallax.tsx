"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function MouseParallax({
  children,
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x);

  const smoothY = useSpring(y);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    x.set((e.clientX - rect.left - rect.width / 2) / 25);

    y.set((e.clientY - rect.top - rect.height / 2) / 25);
  }

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
      }}
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export default MouseParallax;
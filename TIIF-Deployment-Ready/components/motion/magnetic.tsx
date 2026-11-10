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

export function Magnetic({
  children,
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 180,
    damping: 15,
  });

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 15,
  });

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);

    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  }

  function leave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
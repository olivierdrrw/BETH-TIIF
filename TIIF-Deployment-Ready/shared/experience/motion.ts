import type { Transition, Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export const Motion = {
  fast: { duration: 0.16, ease } satisfies Transition,
  medium: { duration: 0.3, ease } satisfies Transition,
  slow: { duration: 0.55, ease } satisfies Transition,
  hero: {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
  } satisfies Variants,
  page: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.16, ease } },
  } satisfies Variants,
  card: {
    rest: { y: 0, scale: 1 },
    hover: { y: -3, scale: 1.005, transition: { duration: 0.2, ease } },
  } satisfies Variants,
  hover: { duration: 0.18, ease } satisfies Transition,
} as const;

import { Variants, Transition } from "framer-motion";

// ---------------------------------------------------------------------------
// TIIF MOTION SYSTEM™
// Inspired by Apple • Linear • Stripe • OpenAI
//
// TODO:
// Future support for prefers-reduced-motion
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// MOTION CONFIG
// ---------------------------------------------------------------------------

export const motionConfig = {
  fast: {
    type: "spring",
    stiffness: 400,
    damping: 28,
  } as Transition,

  normal: {
    type: "spring",
    stiffness: 300,
    damping: 24,
  } as Transition,

  slow: {
    type: "spring",
    stiffness: 200,
    damping: 30,
  } as Transition,
};

// ---------------------------------------------------------------------------
// DEFAULT TRANSITIONS
// ---------------------------------------------------------------------------

export const transition: Transition = motionConfig.normal;

export const exitTransition: Transition = {
  duration: 0.18,
};

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

const withTransition = (
  customTransition?: Transition
): Transition => ({
  ...transition,
  ...(customTransition ?? {}),
});

// ---------------------------------------------------------------------------
// FADE IN
// ---------------------------------------------------------------------------

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,
    transition: withTransition(),
  },
};

// ---------------------------------------------------------------------------
// FADE IN UP
// ---------------------------------------------------------------------------

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: withTransition(),
  },
};

// ---------------------------------------------------------------------------
// FADE IN SCALE
// ---------------------------------------------------------------------------

export const fadeInScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },

  show: {
    opacity: 1,
    scale: 1,
    transition: withTransition(),
  },
};

// ---------------------------------------------------------------------------
// SLIDE UP
// ---------------------------------------------------------------------------

export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: withTransition(),
  },
};

// ---------------------------------------------------------------------------
// SLIDE DOWN
// ---------------------------------------------------------------------------

export const slideDown: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: withTransition(),
  },
};

// ---------------------------------------------------------------------------
// SLIDE LEFT
// ---------------------------------------------------------------------------

export const slideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: 16,
  },

  show: {
    opacity: 1,
    x: 0,
    transition: withTransition(),
  },
};

// ---------------------------------------------------------------------------
// SLIDE RIGHT
// ---------------------------------------------------------------------------

export const slideRight: Variants = {
  hidden: {
    opacity: 0,
    x: -16,
  },

  show: {
    opacity: 1,
    x: 0,
    transition: withTransition(),
  },
};

// ---------------------------------------------------------------------------
// SCALE IN
// ---------------------------------------------------------------------------

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },

  show: {
    opacity: 1,
    scale: 1,
    transition: withTransition(),
  },
};

// ---------------------------------------------------------------------------
// STAGGER CONTAINER
// ---------------------------------------------------------------------------

export const staggerContainer: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// ---------------------------------------------------------------------------
// MODAL ANIMATION
// ---------------------------------------------------------------------------

export const modalAnimation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },

  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: withTransition(),
  },

  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: exitTransition,
  },
};

// ---------------------------------------------------------------------------
// DRAWER ANIMATION
// ---------------------------------------------------------------------------

export const drawerAnimation: Variants = {
  hidden: {
    x: "-100%",
  },

  show: {
    x: 0,
    transition: withTransition(),
  },

  exit: {
    x: "-100%",
    transition: exitTransition,
  },
};

// ---------------------------------------------------------------------------
// PAGE TRANSITION
// ---------------------------------------------------------------------------

export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: withTransition(),
  },

  exit: {
    opacity: 0,
    y: -12,
    transition: exitTransition,
  },
};

// ---------------------------------------------------------------------------
// HOVER PRESETS
// ---------------------------------------------------------------------------

export const hoverLift = {
  y: -4,
  scale: 1.01,
};

export const hoverScale = {
  scale: 1.03,
};

export const tapScale = {
  scale: 0.98,
};

// ---------------------------------------------------------------------------
// CARD PRESETS
// ---------------------------------------------------------------------------

export const cardHover = {
  y: -6,
  scale: 1.01,
  transition: motionConfig.fast,
};

// ---------------------------------------------------------------------------
// BUTTON PRESETS
// ---------------------------------------------------------------------------

export const buttonHover = {
  scale: 1.02,
  transition: motionConfig.fast,
};

export const buttonTap = {
  scale: 0.98,
};







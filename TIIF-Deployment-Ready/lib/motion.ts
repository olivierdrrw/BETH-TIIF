export const fadeUp = {

  initial: {

    opacity: 0,

    y: 30,

  },

  whileInView: {

    opacity: 1,

    y: 0,

  },

  transition: {

    duration: .6,

  },

  viewport: {

    once: true,

  },

};

export const stagger = {

  transition: {

    staggerChildren: .12,

  },

};

export const floating = {

  animate: {

    y: [0,-6,0],

  },

  transition: {

    duration: 8,

    repeat: Infinity,

    ease: "easeInOut",

  },

};

export const breathe = {

  animate: {

    scale: [1,1.01,1],

  },

  transition: {

    duration: 10,

    repeat: Infinity,

    ease: "easeInOut",

  },

};
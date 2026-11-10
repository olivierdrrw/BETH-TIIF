"use client";

import {
  motion,
} from "framer-motion";

export function HumanTwinOrb() {

  return (

    <div
      className="
      flex
      justify-center
      "
    >

      <motion.div

        animate={{

          scale: [
            1,
            1.05,
            1,
          ],

          rotate: [
            0,
            5,
            -5,
            0,
          ],

        }}

        transition={{

          repeat:
            Infinity,

          duration: 6,

        }}

        className="
        h-64
        w-64
        rounded-full

        bg-gradient-to-br

        from-navy-500

        via-navy-500

        to-navy-500

        shadow-2xl
        "
      />

    </div>

  );
}
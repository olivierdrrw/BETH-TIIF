"use client";

import {
  motion,
} from "framer-motion";

export function HumanTwinOrbV2() {

  return (
    <div
      className="
      relative
      flex
      items-center
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
        }}
        transition={{
          duration: 8,
          repeat:
            Infinity,
        }}
        className="
          h-72
          w-72
          rounded-full
          bg-gradient-to-br
          from-navy-500
          via-navy-500
          to-navy-500
          blur-xl
        "
      />

      <div
        className="
        absolute
        text-center
        "
      >
        <p
          className="
          text-sm
          uppercase
          tracking-[0.4em]
          text-zinc-400
          "
        >
          Human Twin
        </p>

        <h2
          className="
          mt-3
          text-5xl
          font-bold
          "
        >
          82%
        </h2>
      </div>

    </div>
  );
}
"use client";

import {
  motion,
} from "framer-motion";

export function TwinCreationAnimation() {

  return (
    <div
      className="
      relative
      flex
      h-[400px]
      items-center
      justify-center
    "
    >

      <motion.div
        animate={{
          scale: [
            1,
            1.08,
            1,
          ],

          opacity: [
            0.7,
            1,
            0.7,
          ],
        }}

        transition={{
          duration: 6,
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
          to-navy-400
          blur-2xl
        "
      />

      <motion.div
        animate={{
          rotate: 360,
        }}

        transition={{
          duration: 30,
          repeat:
            Infinity,
          ease: "linear",
        }}

        className="
          absolute
          h-80
          w-80
          rounded-full
          border
          border-white/10
        "
      />

    </div>
  );
}
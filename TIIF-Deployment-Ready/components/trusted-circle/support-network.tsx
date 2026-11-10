"use client";

import { motion } from "framer-motion";

export function SupportNetwork() {
  return (
    <div
      className="
      rounded-3xl
      border
      p-6
      "
    >
      <h3 className="font-semibold">
        Support Network™
      </h3>

      <div
        className="
        mt-8
        flex
        justify-center
        "
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="
          h-24
          w-24
          rounded-full
          border
          "
        />
      </div>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";

interface Props {
  badge?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export function SectionTitle({
  badge,
  title,
  description,
  center,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .7 }}
      className={center ? "text-center" : ""}
    >
      {badge && (
        <span
          className="
            inline-flex
            rounded-full
            border
            border-navy-500/10
            bg-navy-500/5
            px-5
            py-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.25em]
            text-navy-700
            dark:text-navy-300
          "
        >
          {badge}
        </span>
      )}

      <h2
        className="
          mt-6
          text-5xl
          font-bold
          tracking-tight
          text-slate-900
          dark:text-white
        "
      >
        {title}
      </h2>

      {description && (
        <p
          className="
            mx-auto
            mt-6
            max-w-3xl
            text-lg
            leading-8
            text-slate-600
            dark:text-slate-400
          "
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
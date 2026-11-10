"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-600 via-navy-600 to-navy-700 py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white md:text-6xl"
        >
          Start Building Your Better Future
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: .2 }}
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/80"
        >
          Discover your Human Twin™, understand your identity,
          and begin your personal growth journey with TIIF.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: .3 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/signup"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-navy-700 transition hover:scale-105"
          >
            Get Started
          </Link>

          <Link
            href="/about"
            className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-navy-700"
          >
            Learn More
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
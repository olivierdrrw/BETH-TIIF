"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function VisionStatement() {
  return (
    <section className="py-32 md:py-48 bg-[#050505] relative flex items-center justify-center overflow-hidden">
      
      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-navy-600/10 to-navy-600/10 rounded-full blur-[100px]" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Our Mission
          </p>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
            Help people <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-400 via-navy-400 to-navy-400">
              understand themselves,
            </span><br />
            heal, grow and thrive.
          </h2>

          <p className="mx-auto mt-12 max-w-3xl text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
            We believe wellbeing should be measurable, accessible, personal, and deeply human.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
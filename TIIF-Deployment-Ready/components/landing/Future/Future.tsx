"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Future() {
  return (
    <section className="relative py-32 border-t border-white/5 bg-[#050505] overflow-hidden">
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-navy-600/10 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            The Vision
          </p>

          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
            Building the future <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
              of human development.
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-400 mb-12">
            A future where every individual has access to deep understanding, 
            support, healing, growth, and meaningful human connection.
          </p>

          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Join the Waitlist <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
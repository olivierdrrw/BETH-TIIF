"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Bot, User, Sparkles } from "lucide-react";

export function AICompanion() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-[#050505] border-t border-white/5">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-navy-600/10 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* LEFT: Copywriting */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-navy-400 mb-6 uppercase tracking-widest">
              <Bot className="w-4 h-4" />
              AI Companion™
            </div>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Not a therapist. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-400 to-navy-500">
                A guide for growth.
              </span>
            </h2>

            <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-xl">
              Reflect. Learn. Understand your patterns. Receive personalized, secure, and deeply empathetic guidance throughout your daily wellbeing journey.
            </p>
          </motion.div>

          {/* RIGHT: Mock UI Chat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* The Phone/Chat Frame */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 shadow-2xl relative z-10">
              
              <div className="space-y-6">
                
                {/* AI Message */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-navy-600 to-navy-600 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 text-sm text-gray-300 shadow-sm">
                    Hello Alex. How have you been feeling today?
                  </div>
                </div>

                {/* User Message */}
                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="bg-navy-600/20 border border-navy-500/30 text-navy-100 rounded-2xl rounded-tr-sm p-4 text-sm shadow-sm">
                    I've been overwhelmed by school and family expectations recently.
                  </div>
                </div>

                {/* AI Insight Response */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-navy-600 to-navy-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(38, 61, 112,0.4)]">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 text-sm text-gray-300 shadow-sm border-l-2 border-l-navy-500">
                    Thank you for trusting me with that. Let's slow down. Which of those two—school or family—feels heaviest right now?
                  </div>
                </div>

              </div>
            </div>

            {/* Decorative background blocks */}
            <div className="absolute -top-10 -right-10 w-full h-full border border-white/5 rounded-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-full h-full border border-white/5 rounded-3xl -z-10 bg-white/[0.01]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
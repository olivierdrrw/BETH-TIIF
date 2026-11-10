"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function VoiceDemo() {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-navy-400">
              Voice Intelligence
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Speak your mind. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-400 to-navy-500">
                Literally.
              </span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              Sometimes writing is too hard. With TIIF’s advanced conversational AI, you can simply talk. It detects tone, pauses, and emotional weight in your voice, offering real-time verbal guidance.
            </p>
          </motion.div>

          {/* Voice Interface Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="p-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-2xl shadow-[0_0_50px_rgba(93, 133, 209,0.1)] text-center">
              
              <p className="text-sm text-gray-400 mb-8">"I'm feeling really anxious about tomorrow..."</p>
              
              {/* Animated Audio Waves */}
              <div className="flex items-center justify-center gap-1.5 h-20 mb-8">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                    className="w-1.5 rounded-full bg-gradient-to-t from-navy-500 to-navy-400"
                  />
                ))}
              </div>

              <div className="flex items-center justify-center gap-6">
                <button className="w-16 h-16 rounded-full bg-navy-500/20 text-navy-400 flex items-center justify-center hover:bg-navy-500/30 transition-colors border border-navy-500/50">
                  <Play className="w-6 h-6 ml-1" />
                </button>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">TIIF Voice Response</p>
                  <p className="text-xs text-navy-400">Listening to tone & emotion...</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
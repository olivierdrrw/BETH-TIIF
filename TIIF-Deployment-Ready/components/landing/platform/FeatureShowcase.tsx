"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Bot, Mic, Activity, Network, Target } from "lucide-react";

const features = [
  {
    title: "Human Twin™",
    description: "A living digital reflection of growth, identity, wellbeing and personal development.",
    icon: BrainCircuit,
    color: "text-navy-400",
    bg: "bg-navy-500/10",
    border: "group-hover:border-navy-500/50"
  },
  {
    title: "AI Companion™",
    description: "An intelligent guide that helps users reflect, learn and grow every day.",
    icon: Bot,
    color: "text-navy-400",
    bg: "bg-navy-500/10",
    border: "group-hover:border-navy-500/50"
  },
  {
    title: "AI Avatar Therapist™",
    description: "Voice-enabled AI experiences designed to make support more accessible and engaging.",
    icon: Mic,
    color: "text-navy-400",
    bg: "bg-navy-500/10",
    border: "group-hover:border-navy-500/50"
  },
  {
    title: "Wellness Index™",
    description: "A measurable, real-time view of wellbeing, resilience and personal progress.",
    icon: Activity,
    color: "text-navy-400",
    bg: "bg-navy-500/10",
    border: "group-hover:border-navy-500/50"
  },
  {
    title: "Identity Graph™",
    description: "Understand the deep connections between experiences, emotions and personal growth.",
    icon: Network,
    color: "text-navy-400",
    bg: "bg-navy-500/10",
    border: "group-hover:border-navy-500/50"
  },
  {
    title: "Growth Score™",
    description: "Track meaningful human development across different dimensions of life.",
    icon: Target,
    color: "text-navy-400",
    bg: "bg-navy-500/10",
    border: "group-hover:border-navy-500/50"
  }
];

export function FeatureShowcase() {
  return (
    <section className="py-24 md:py-32 bg-[#050505] relative border-t border-white/5">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mb-20 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-navy-400">
            Platform Features
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Built for human <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-400 to-navy-500">growth.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${feature.border}`}
            >
              <div className={`mb-8 w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500 ${feature.bg}`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>

              <p className="leading-relaxed text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
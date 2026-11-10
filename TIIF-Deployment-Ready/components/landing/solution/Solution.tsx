"use client";

import { motion } from "framer-motion";
import {
  Brain,
  UserCircle2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const solutions = [
  {
    icon: Brain,
    title: "AI Companion™",
    description:
      "Receive intelligent guidance powered by your Human Twin™, behaviour, goals and wellbeing.",
  },
  {
    icon: UserCircle2,
    title: "Human Twin™",
    description:
      "A living digital reflection that evolves with your identity, habits, emotions and growth.",
  },
  {
    icon: TrendingUp,
    title: "Growth Intelligence™",
    description:
      "Measure meaningful progress across purpose, resilience, productivity and wellbeing.",
  },
  {
    icon: ShieldCheck,
    title: "Trauma-Informed™",
    description:
      "Evidence-based human development framework designed around healing and growth.",
  },
];

export function Solution() {
  return (
    <section className="relative overflow-hidden py-40">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#3E63B0]/10 blur-[180px]" />

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="mx-auto max-w-4xl text-center"
        >

          <span
            className="
            inline-flex
            rounded-full
            border
            border-white/10
            bg-white/5
            px-5
            py-2
            text-xs
            uppercase
            tracking-[0.35em]
            text-[#3E63B0]
            backdrop-blur-xl
          "
          >
            The TIIF Solution
          </span>

          <h2
            className="
            mt-8
            text-5xl
            font-black
            leading-[0.95]
            tracking-tight
            md:text-7xl
          "
          >
            More Than
            <br />
            Mental Health
          </h2>

          <p
            className="
            mx-auto
            mt-8
            max-w-3xl
            text-xl
            leading-9
            text-zinc-400
          "
          >
            TIIF combines Artificial Intelligence,
            Identity Science,
            Trauma-Informed Care
            and Human Development
            into one intelligent operating system.
          </p>

        </motion.div>

        <div className="mt-24 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {solutions.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div

                key={item.title}

                initial={{
                  opacity: 0,
                  y: 50,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                viewport={{ once: true }}

                transition={{
                  delay: index * .12,
                  duration: .7,
                }}

                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}

                className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-white/[0.03]
                p-8
                backdrop-blur-3xl
                transition-all
                duration-500
                hover:border-[#3E63B0]/40
                hover:shadow-[0_0_60px_rgba(62, 99, 176,.18)]
              "
              >

                <div
                  className="
                  absolute
                  -right-20
                  -top-20
                  h-56
                  w-56
                  rounded-full
                  bg-[#3E63B0]/10
                  blur-[100px]
                  opacity-0
                  transition
                  duration-500
                  group-hover:opacity-100
                "
                />

                <div
                  className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#3E63B0]/10
                  ring-1
                  ring-[#3E63B0]/20
                "
                >

                  <Icon
                    className="
                    h-8
                    w-8
                    text-[#3E63B0]
                    transition
                    duration-500
                    group-hover:rotate-6
                    group-hover:scale-110
                  "
                  />

                </div>

                <h3 className="mt-8 text-2xl font-semibold">
                  {item.title}
                </h3>

                <p
                  className="
                  mt-5
                  leading-8
                  text-zinc-400
                "
                >
                  {item.description}
                </p>

                <div
                  className="
                  mt-10
                  flex
                  items-center
                  gap-2
                  font-medium
                  text-[#3E63B0]
                "
                >
                  Learn More

                  <ArrowRight
                    className="
                    h-4
                    w-4
                    transition
                    group-hover:translate-x-1
                  "
                  />

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}
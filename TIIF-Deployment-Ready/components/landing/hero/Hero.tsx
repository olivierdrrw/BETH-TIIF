"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import LivingOrb from "./LivingOrb";
import AnimatedMesh from "@/components/effects/animated-mesh";
import AuroraBackground from "@/components/effects/aurora-background";
import FloatingParticles from "@/components/effects/floating-particles";

function CountUp({ value, suffix = "", duration = 1300 }: { value: number; suffix?: string; duration?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <>{display}{suffix}</>;
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-0 top-0 h-[700px] w-[700px] rounded-full bg-navy-500/10 blur-[180px]" />

        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-white/5 blur-[150px]" />

      </div>

      <div
        className="
        relative
        mx-auto
        grid
        min-h-screen
        max-w-7xl
        items-center
        gap-20
        px-8
        lg:grid-cols-2
        "
      >

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >

          <span
            className="
            rounded-full
            border
            border-navy-500/30
            bg-navy-500/10
            px-4
            py-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.25em]
            text-navy-400
            "
          >
            Trauma-Informed Identity Framework™
          </span>

          <h1
            className="
            mt-8
            text-6xl
            font-bold
            leading-tight
            lg:text-7xl
            "
          >
            Build a Digital
            <br />
            Reflection
            <br />
            of Your Whole Life
          </h1>

          <p
            className="
            mt-8
            max-w-2xl
            text-xl
            leading-9
            text-zinc-400
            "
          >
            Understand your identity, wellbeing,
            purpose, relationships and future
            potential through your evolving
            Human Twin™.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">

            <Link
              href="/register"
              className="
              rounded-2xl
              bg-navy-500
              px-8
              py-4
              font-semibold
              text-white
              transition-all
              hover:scale-105
              hover:bg-navy-400
              "
            >
              Start Your Journey
            </Link>

            <Link
              href="/dashboard"
              className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-8
              py-4
              backdrop-blur-xl
              transition-all
              hover:bg-white/10
              "
            >
              View Platform
            </Link>

          </div>

          {/* Metrics */}

          <div className="mt-16 grid grid-cols-3 gap-6">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-3xl font-bold text-navy-400"><CountUp value={92} suffix="%" /></p>
              <p className="mt-2 text-sm text-zinc-400">
                Identity Score
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-3xl font-bold text-navy-400"><CountUp value={81} /></p>
              <p className="mt-2 text-sm text-zinc-400">
                Growth Score
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-3xl font-bold text-navy-400"><CountUp value={84} suffix="%" /></p>
              <p className="mt-2 text-sm text-zinc-400">
                Resilience
              </p>
            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >

          <LivingOrb />

          {/* Floating Card */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="
            absolute
            right-0
            top-24
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-5
            backdrop-blur-2xl
            "
          >
            <p className="text-xs uppercase text-zinc-400">
              Human Twin™
            </p>

            <p className="mt-2 text-2xl font-bold text-navy-400">
              Live
            </p>

            <p className="text-sm text-zinc-500">
              Intelligence Active
            </p>

          </motion.div>

        </motion.div>

      </div>
<AnimatedMesh />
<AuroraBackground />
<FloatingParticles />

    </section>
    
  );
}
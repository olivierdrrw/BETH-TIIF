"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";

export function WhyTiif() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Ambient Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Container size="xl" className="space-y-20">

        {/* HERO STORY */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="mb-4 text-sm tracking-[0.2em] uppercase text-muted-foreground">
            Why TIIF Exists
          </p>

          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Most people are taught
            <br />
            how to succeed.
            <br />
            Few are taught
            <br />
            how to understand themselves.
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Across the world, young people navigate stress, trauma,
            identity confusion, emotional pressure, and uncertainty
            about who they are becoming. Many only receive support
            when a crisis appears.
          </p>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            We believe growth should not begin at breakdown.
            It should begin with awareness, reflection, guidance,
            and human connection.
          </p>
        </motion.div>

        {/* JOURNEY CARDS */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Awareness */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="rounded-3xl border bg-card/50 p-8 backdrop-blur-sm dark:bg-card/30"
          >
            <div className="mb-4 text-sm text-primary">01</div>

            <h3 className="text-2xl font-semibold">Awareness</h3>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Understanding begins with noticing patterns,
              emotions, experiences, and behaviors that shape
              everyday life.
            </p>
          </motion.div>

          {/* Identity */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="rounded-3xl border bg-card/50 p-8 backdrop-blur-sm dark:bg-card/30"
          >
            <div className="mb-4 text-sm text-primary">02</div>

            <h3 className="text-2xl font-semibold">Identity</h3>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Clarity grows when people understand who they are,
              what matters to them, and who they are becoming.
            </p>
          </motion.div>

          {/* Growth */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="rounded-3xl border bg-card/50 p-8 backdrop-blur-sm dark:bg-card/30"
          >
            <div className="mb-4 text-sm text-primary">03</div>

            <h3 className="text-2xl font-semibold">Growth</h3>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Small reflections, supportive relationships,
              and consistent guidance create meaningful
              personal development over time.
            </p>
          </motion.div>
        </div>

        {/* HUMAN TWIN FEATURE BLOCK (ENHANCED) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            type: "spring",
            stiffness: 180,
            damping: 20,
          }}
          className="rounded-[2rem] border border-primary/10 bg-card/40 p-8 md:p-12 backdrop-blur-sm dark:bg-card/30"
        >
          <p className="text-sm uppercase tracking-wider text-muted-foreground">
            Introducing
          </p>

          <h3 className="mt-3 text-3xl font-semibold md:text-4xl">
            Human Twin™
          </h3>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            A living reflection of your identity, wellbeing,
            growth patterns, resilience, and personal journey.
            Human Twin™ helps transform self-awareness into
            meaningful action and long-term development.
          </p>
        </motion.div>

        {/* FUTURE FEATURES */}
        <div className="grid gap-6 md:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="rounded-3xl border p-8"
          >
            <h4 className="text-xl font-semibold">
              Crisis Support Layer™
            </h4>

            <p className="mt-3 text-muted-foreground leading-relaxed">
              When someone appears to be struggling,
              TIIF can surface trusted support options,
              therapist pathways, helplines, and wellbeing
              resources without replacing professional care.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="rounded-3xl border p-8"
          >
            <h4 className="text-xl font-semibold">
              Trusted Circle™
            </h4>

            <p className="mt-3 text-muted-foreground leading-relaxed">
              Parents, mentors, friends, counselors,
              and trusted supporters can become part of
              a healthy ecosystem that encourages growth,
              accountability, and connection.
            </p>
          </motion.div>
        </div>

        {/* CLOSING */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="border-t pt-12"
        >
          <p className="max-w-4xl text-2xl font-medium leading-relaxed md:text-3xl">
            TIIF is not built to diagnose people.
          </p>

          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-muted-foreground">
            It is built to help them understand,
            heal, grow, and thrive.
          </p>
        </motion.div>

      </Container>
    </section>
  );
}

export default WhyTiif;
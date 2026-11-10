"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";

const steps = [
  {
    number: "01",
    title: "Understand",
    description:
      "Gain clarity about your emotions, behaviors, identity patterns, and wellbeing through reflection, journaling, and AI-powered insights.",
  },
  {
    number: "02",
    title: "Support",
    description:
      "Receive personalized guidance, resources, and access to trusted support systems whenever additional help is needed.",
  },
  {
    number: "03",
    title: "Heal",
    description:
      "Build emotional resilience through reflection tools, therapeutic practices, and meaningful conversations.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Transform awareness into action with continuous feedback, growth tracking, and intentional personal development.",
  },
  {
    number: "05",
    title: "Thrive",
    description:
      "Develop lasting wellbeing, stronger relationships, greater purpose, and the confidence to navigate life’s challenges.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Ambient Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Container size="xl">
        <div className="space-y-24">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              How TIIF Works
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              A continuous system
              <br />
              for human development.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              TIIF is not a one-time tool. It is a living system that guides you
              through awareness, support, healing, growth, and long-term wellbeing
              using reflection, AI insight, and human connection.
            </p>
          </motion.div>

          {/* TIMELINE */}
          <div className="relative">
            {/* CENTER LINE WITH GLOW */}
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/40 via-border to-primary/10 md:left-1/2" />

            <div className="space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="relative"
                >
                  {/* NODE */}
                  <div className="absolute left-4 top-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full bg-primary md:left-1/2">
                    <div className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                  </div>

                  {/* CARD POSITION */}
                  <div
                    className={`ml-12 md:ml-0 ${
                      index % 2 === 0 ? "md:mr-[52%]" : "md:ml-[52%]"
                    }`}
                  >
                    <div className="rounded-3xl border bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                      
                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-sm font-medium text-primary">
                          {step.number}
                        </span>
                        <div className="h-px flex-1 bg-border" />
                      </div>

                      <h3 className="text-2xl font-semibold">
                        {step.title}
                      </h3>

                      <p className="mt-4 leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* HUMAN TWIN BLOCK */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border bg-card/40 p-8 md:p-12"
          >
            <p className="text-sm uppercase tracking-wider text-muted-foreground">
              Core Intelligence Layer
            </p>

            <h3 className="mt-3 text-3xl font-semibold md:text-4xl">
              Human Twin™
            </h3>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              A living digital reflection of your identity, emotional patterns,
              wellbeing, growth trajectory, and behavioral insights. Human Twin™
              evolves with you over time.
            </p>

            {/* METRICS PREVIEW */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border p-4">
                <p className="text-sm text-muted-foreground">Growth Score™</p>
              </div>

              <div className="rounded-2xl border p-4">
                <p className="text-sm text-muted-foreground">Wellness Index™</p>
              </div>

              <div className="rounded-2xl border p-4">
                <p className="text-sm text-muted-foreground">Identity Signals™</p>
              </div>
            </div>

            {/* LOOP */}
            <div className="mt-10 rounded-2xl border p-6">
              <h4 className="text-lg font-semibold">
                The TIIF Intelligence Loop™
              </h4>

              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Journal → Reflection → AI Companion → Growth Score™ → Human Twin™ → Support System → Repeat
              </p>
            </div>
          </motion.div>

          {/* SUPPORT SYSTEMS */}
          <div className="grid gap-6 md:grid-cols-2">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border p-8 transition hover:-translate-y-1 hover:border-primary/20"
            >
              <h4 className="text-xl font-semibold">
                Crisis Support Layer™
              </h4>

              <p className="mt-3 text-muted-foreground">
                When emotional distress signals are detected, TIIF surfaces
                immediate support options such as helplines, therapists,
                and trusted resources.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border p-8 transition hover:-translate-y-1 hover:border-primary/20"
            >
              <h4 className="text-xl font-semibold">
                Trusted Circle™
              </h4>

              <p className="mt-3 text-muted-foreground">
                Parents, mentors, friends, and counselors form a safe
                ecosystem of emotional and developmental support.
              </p>
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  );
}

export default HowItWorks;
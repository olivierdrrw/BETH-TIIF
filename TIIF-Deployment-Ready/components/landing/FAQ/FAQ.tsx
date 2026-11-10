"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is TIIF?",
    answer:
      "TIIF (Trauma-Informed Identity Framework) is an AI-powered human development platform that helps users understand themselves, improve wellbeing, and grow through personalized insights.",
  },
  {
    question: "What is Human Twin™?",
    answer:
      "Human Twin™ is your evolving digital reflection. It combines your assessments, mood, journal, and growth data to provide personalized guidance.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. TIIF is designed with privacy and security in mind. Your personal information is encrypted and protected.",
  },
  {
    question: "Who can use TIIF?",
    answer:
      "Individuals, schools, therapists, NGOs, organizations, and communities can all use TIIF.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white dark:bg-background">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-4xl font-bold mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border dark:border-slate-700"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="font-semibold">{faq.question}</span>

                <ChevronDown
                  className={`transition-transform ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
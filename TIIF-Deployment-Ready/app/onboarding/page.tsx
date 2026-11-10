"use client";

import Link from "next/link";
import LivingOrb from "@/components/human-twin/living-orb";

export default function OnboardingPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-10 h-56 w-56">
        <LivingOrb />
      </div>

      <span className="inline-block rounded-full border border-navy-500/30 bg-navy-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-navy-400">
        Trauma-Informed Identity Framework™
      </span>

      <h1 className="mt-6 text-5xl font-bold">Welcome to TIIF</h1>

      <p className="mt-6 text-lg text-zinc-400">Let's create your Human Twin.</p>

      <Link
        href="/onboarding/role"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-navy-500 px-6 py-3 font-semibold text-white transition hover:bg-navy-400"
      >
        Begin Assessment
      </Link>
    </div>
  );
}

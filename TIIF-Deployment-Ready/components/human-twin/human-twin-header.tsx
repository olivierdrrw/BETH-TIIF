"use client";

export function HumanTwinHeader() {
  return (
    <section className="space-y-4">
      <span
        className="
          inline-flex
          rounded-full
          border
          border-white/10
          bg-white/5
          px-4
          py-2
          text-xs
          uppercase
          tracking-[0.25em]
          text-zinc-400
        "
      >
        Human Twin
      </span>

      <h1
        className="
          text-5xl
          font-semibold
          tracking-tight
          text-white
        "
      >
        Living Reflection
      </h1>

      <p
        className="
          max-w-2xl
          text-lg
          text-zinc-400
        "
      >
        Your identity, growth,
        wellbeing and purpose
        evolving in real time.
      </p>
    </section>
  );
}
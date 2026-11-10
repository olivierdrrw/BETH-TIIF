"use client";

export default function HeroGreeting() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div>

      <p className="text-sm uppercase tracking-[0.35em] text-navy-400">
        HUMAN DEVELOPMENT OPERATING SYSTEM™
      </p>

      <h1 className="mt-3 text-5xl font-bold tracking-tight">
        {greeting}, Olivier.
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
        Your Human Twin analyzed today's wellbeing,
        identity growth and future trajectory.
      </p>

    </div>
  );
}
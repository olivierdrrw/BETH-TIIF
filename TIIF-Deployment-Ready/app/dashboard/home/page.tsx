 import { HumanTwinOrb } from "@/components/human-twin/human-twin-orb";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 p-8">
      <section className="flex flex-col items-center justify-center">
        <HumanTwinOrb />

        <h1 className="mt-8 text-4xl font-semibold">
          Good Morning, Olivier
        </h1>

        <p className="mt-2 text-zinc-400">
          Your growth journey is progressing
          steadily this week.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-zinc-800 p-6">
          <h3>Identity</h3>
          <p className="mt-2 text-3xl">78%</p>
        </div>

        <div className="rounded-3xl border border-zinc-800 p-6">
          <h3>Growth</h3>
          <p className="mt-2 text-3xl">82%</p>
        </div>

        <div className="rounded-3xl border border-zinc-800 p-6">
          <h3>Wellbeing</h3>
          <p className="mt-2 text-3xl">84%</p>
        </div>
      </section>
    </div>
  );
}
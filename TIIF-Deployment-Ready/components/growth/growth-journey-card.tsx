"use client";

interface Props {
  score: number;
}

export function
GrowthJourneyCard({
  score,
}: Props) {
  return (
    <div className="
      rounded-3xl
      border
      border-zinc-800
      p-8
    ">
      <p className="text-zinc-500">
        Growth Journey™
      </p>

      <h2 className="mt-3 text-5xl font-bold">
        {score}%
      </h2>

      <p className="mt-3 text-zinc-400">
        Personal development
        progress.
      </p>
    </div>
  );
}
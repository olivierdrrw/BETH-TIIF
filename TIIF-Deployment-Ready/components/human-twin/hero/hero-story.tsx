"use client";

export default function HeroStory() {
  return (
    <div
      className="
        mx-auto
        max-w-3xl
        rounded-3xl
        border
        border-navy-500/20
        bg-navy-500/5
        p-8
      "
    >

      <p
        className="
          text-xs
          uppercase
          tracking-[0.3em]
          text-navy-400
        "
      >
        TODAY'S STORY
      </p>

      <h3
        className="
          mt-5
          text-3xl
          font-semibold
        "
      >
        You are becoming more resilient.
      </h3>

      <p
        className="
          mt-6
          leading-9
          text-slate-300
        "
      >
        Your Human Twin detected improved
        emotional consistency and stronger
        identity alignment compared to
        last week.
      </p>

    </div>
  );
}
"use client";

export function IdentityCard() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-navy-500/20
        bg-navy-500/5
        p-6
      "
    >
      <p className="text-sm text-zinc-400">
        Identity
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        84%
      </h2>

      <p className="mt-3 text-sm text-zinc-400">
        Strong self-awareness
        and values clarity.
      </p>
    </div>
  );
}
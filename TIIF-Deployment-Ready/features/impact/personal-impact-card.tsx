interface Props {
  score: number;
}

export function PersonalImpactCard({
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
        Impact Score™
      </p>

      <h2 className="mt-3 text-5xl font-bold">
        {score}
      </h2>

      <p className="mt-3 text-zinc-400">
        Positive life change
        generated through
        consistent growth.
      </p>
    </div>
  );
}
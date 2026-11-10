interface Props {
  score: number;
}

export function
AssessmentCard({
  score,
}: Props) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-zinc-800
      p-8
    "
    >
      <p className="text-zinc-500">
        Assessment™
      </p>

      <h2 className="mt-3 text-5xl font-bold">
        {score}
      </h2>

      <p className="mt-3 text-zinc-400">
        Human development
        baseline score.
      </p>
    </div>
  );
}
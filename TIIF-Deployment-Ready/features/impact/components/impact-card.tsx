interface Props {
  score: number;
}

export function ImpactCard({
  score,
}: Props) {

  return (

    <div
      className="
      rounded-3xl
      border
      border-white/10
      p-6
      "
    >

      <p
        className="
        text-sm
        text-zinc-400
        "
      >
        Impact Score
      </p>

      <h2
        className="
        mt-2
        text-5xl
        font-bold
        "
      >
        {score}
      </h2>

    </div>
  );
}
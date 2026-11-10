interface Props {
  title: string;
  duration: number;
}

export function LearningCard({
  title,
  duration,
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
      <h3>{title}</h3>

      <p className="text-zinc-400">
        {duration} min
      </p>
    </div>
  );
}
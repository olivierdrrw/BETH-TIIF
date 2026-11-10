interface Props {
  title: string;
  description: string;
}

export function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      py-20
      text-center
    "
    >
      <h3
        className="
        text-xl
        font-semibold
      "
      >
        {title}
      </h3>

      <p
        className="
        mt-2
        text-zinc-400
        "
      >
        {description}
      </p>
    </div>
  );
}
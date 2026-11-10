interface Props {
  title: string;

  description?: string;
}

export function TiifSection({
  title,
  description,
}: Props) {
  return (
    <div className="space-y-3">

      <h2
        className="
        text-3xl
        font-semibold
        tracking-tight
      "
      >
        {title}
      </h2>

      {description && (
        <p
          className="
          text-zinc-400
          max-w-3xl
        "
        >
          {description}
        </p>
      )}

    </div>
  );
}
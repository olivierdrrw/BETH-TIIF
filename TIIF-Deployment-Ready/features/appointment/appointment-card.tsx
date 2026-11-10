interface Props {
  title: string;

  date: string;
}

export function AppointmentCard({
  title,
  date,
}: Props) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      p-5
    "
    >
      <h3>{title}</h3>

      <p
        className="
        text-zinc-400
      "
      >
        {date}
      </p>
    </div>
  );
}
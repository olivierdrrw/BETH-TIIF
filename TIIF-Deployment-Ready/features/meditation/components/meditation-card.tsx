interface Props {

  title: string;

  duration: number;

}

export function MeditationCard({

  title,

  duration,

}: Props) {

  return (

    <div
      className="
      rounded-3xl
      border
      p-6
      "
    >

      <h3
        className="
        font-semibold
        "
      >
        {title}
      </h3>

      <p
        className="
        text-sm
        text-zinc-500
        "
      >
        {duration} min
      </p>

    </div>

  );
}
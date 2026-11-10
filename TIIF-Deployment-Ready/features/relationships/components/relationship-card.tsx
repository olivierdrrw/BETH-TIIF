interface Props {

  title: string;

  score: number;

}

export function RelationshipCard({

  title,

  score,

}: Props) {

  return (

    <div
      className="
      rounded-3xl
      border
      p-6
      "
    >

      <h3>{title}</h3>

      <h2
        className="
        text-3xl
        font-bold
        "
      >
        {score}%
      </h2>

    </div>

  );
}
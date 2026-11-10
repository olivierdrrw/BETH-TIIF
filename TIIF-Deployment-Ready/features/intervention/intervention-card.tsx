import { Intervention }
from "@/types/intervention";

export function InterventionCard({
  intervention,
}: {
  intervention: Intervention;
}) {

  return (

    <div
      className="
      rounded-2xl
      border
      border-white/10
      p-5
      "
    >

      <h4>
        {intervention.title}
      </h4>

      <p
        className="
        mt-2
        text-zinc-400
        "
      >
        {
          intervention.description
        }
      </p>

      <div
        className="
        mt-3
        text-navy-400
        "
      >
        +
        {
          intervention.estimatedImpact
        }
        % Impact
      </div>

    </div>
  );
}
export function EvidenceDashboard() {
  return (
    <div className="
      rounded-3xl
      border
      border-zinc-800
      p-8
    ">
      <h2 className="text-2xl font-semibold">
        Evidence Dashboard™
      </h2>

      <div className="
        mt-8
        grid
        gap-6
        md:grid-cols-4
      ">
        <Metric
          label="Users Improved"
          value="78%"
        />

        <Metric
          label="Retention"
          value="42%"
        />

        <Metric
          label="Growth Increase"
          value="+18%"
        />

        <Metric
          label="Impact Score"
          value="81"
        />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}
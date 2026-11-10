interface MetricCardProps {
  title: string;
  value: string | number;
}

export function MetricCard({
  title,
  value,
}: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 p-6">
      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        {value}
      </h2>
    </div>
  );
}
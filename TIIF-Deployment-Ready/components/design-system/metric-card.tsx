import { GlassCard } from "./glass-card";

interface Props {
  title: string;
  value: string;
}

export function MetricCard({
  title,
  value,
}: Props) {
  return (
    <GlassCard
      className="
      p-6
      "
    >
      <p
        className="
        text-sm
        text-muted-foreground
        "
      >
        {title}
      </p>

      <h2
        className="
        mt-3
        text-4xl
        font-bold
        "
      >
        {value}
      </h2>
    </GlassCard>
  );
}
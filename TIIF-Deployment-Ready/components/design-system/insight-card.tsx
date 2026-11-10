import { GlassCard } from "./glass-card";

interface Props {
  title: string;
  content: string;
}

export function InsightCard({
  title,
  content,
}: Props) {
  return (
    <GlassCard
      className="
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
        mt-4
        text-muted-foreground
        "
      >
        {content}
      </p>
    </GlassCard>
  );
}
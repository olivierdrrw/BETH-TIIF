import { MetricCard } from
"@/components/design-system/metric-card";

export function HumanTwinMetrics() {
  return (
    <div
      className="
      grid
      gap-4
      md:grid-cols-4
      "
    >
      <MetricCard
        title="Identity™"
        value="82%"
      />

      <MetricCard
        title="Growth™"
        value="74%"
      />

      <MetricCard
        title="Wellbeing™"
        value="79%"
      />

      <MetricCard
        title="Resilience™"
        value="85%"
      />
    </div>
  );
}
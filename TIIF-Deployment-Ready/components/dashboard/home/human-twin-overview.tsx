import { MetricCard } from
"@/components/design-system/metric-card";

export function
HumanTwinOverview() {
  return (
    <div
      className="
      grid
      gap-4
      md:grid-cols-4
    "
    >
      <MetricCard
        title="Identity Score™"
        value="82%"
      />

      <MetricCard
        title="Growth Score™"
        value="74%"
      />

      <MetricCard
        title="Wellbeing Score™"
        value="79%"
      />

      <MetricCard
        title="Resilience™"
        value="85%"
      />
    </div>
  );
}
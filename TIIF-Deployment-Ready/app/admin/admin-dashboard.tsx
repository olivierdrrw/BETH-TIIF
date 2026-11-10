import { MetricCard } from "@/components/design-system/metric-card";

export function AdminDashboard() {

  return (

    <div
      className="
      grid
      gap-6
      md:grid-cols-4
      "
    >

      <MetricCard
        title="Users"
        value="1,250"
      />

      <MetricCard
        title="Human Twins"
        value="1,248"
      />

      <MetricCard
        title="Impact"
        value="74%"
      />

      <MetricCard
        title="Retention"
        value="41%"
      />

    </div>
  );
}
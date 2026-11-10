import HumanTwinCard from "@/components/human-twin/human-twin-card";

export function PreviewGrid() {
  return (
    <div
      className="
      grid
      gap-6
      p-8
      lg:grid-cols-2
    "
    >

      <HumanTwinCard />

      <div className="h-[360px] rounded-[32px] bg-white/[0.03]" />

      <div className="h-[240px] rounded-[32px] bg-white/[0.03]" />

      <div className="h-[240px] rounded-[32px] bg-white/[0.03]" />

    </div>
  );
}
export function GrowthTimeline() {
  const milestones = [
    "Self Awareness",
    "Emotional Regulation",
    "Purpose Discovery",
    "Identity Clarity",
    "Growth Momentum",
  ];

  return (
    <div className="space-y-4">
      {milestones.map(
        (item) => (
          <div
            key={item}
            className="
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                h-3
                w-3
                rounded-full
                bg-navy-500
              "
            />

            <span>{item}</span>
          </div>
        )
      )}
    </div>
  );
}
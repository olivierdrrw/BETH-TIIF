"use client";

export default function AmbientLayer() {
  return (
    <>
      <div
        className="
        fixed
        inset-0
        pointer-events-none
        opacity-40
        bg-[radial-gradient(circle_at_top,#5D85D118,transparent_55%)]
      "
      />

      <div
        className="
        fixed
        inset-0
        pointer-events-none
        opacity-30
        bg-[radial-gradient(circle_at_bottom,#304D8C12,transparent_65%)]
      "
      />
    </>
  );
}
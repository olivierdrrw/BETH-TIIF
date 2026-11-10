"use client";

import AuroraBackground from "@/components/effects/aurora-background";
import AnimatedMesh from "@/components/effects/animated-mesh";
import FloatingParticles from "@/components/effects/floating-particles";

export default function ShellBackground() {
  return (
    <>
      <AuroraBackground />

      <AnimatedMesh />

      <FloatingParticles />

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(93, 133, 209,.10),transparent_65%)]
        "
      />
    </>
  );
}
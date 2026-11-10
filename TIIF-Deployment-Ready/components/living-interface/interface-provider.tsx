"use client";

import { ReactNode } from "react";
import AmbientLayer from "./ambient-layer";
import ParticlesEngine from "./particles-engine";
import GlowEngine from "./glow-engine";
import PulseEngine from "./pulse-engine";

interface Props {
  children: ReactNode;
}

export default function InterfaceProvider({
  children,
}: Props) {
  return (
    <>
      <AmbientLayer />

      <ParticlesEngine />

      <GlowEngine />

      <PulseEngine />

      {children}
    </>
  );
}
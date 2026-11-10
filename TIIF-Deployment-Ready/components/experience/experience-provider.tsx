"use client";

import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { AmbientLight } from "./ambient-light";
import { CursorGlow } from "./cursor-glow";

interface Props {
  children: ReactNode;
}

export function ExperienceProvider({ children }: Props) {
  return (
    <>
      <AmbientLight />
      <CursorGlow />

      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </>
  );
}
"use client";

import { ReactNode } from "react";

interface DashboardGridProps {
  children: ReactNode;
}

export default function DashboardGrid({
  children,
}: DashboardGridProps) {
  return (
    <div
      className="
        grid
        gap-8
        xl:grid-cols-12
      "
    >
      {children}
    </div>
  );
}
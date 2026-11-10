"use client";

import { ReactNode } from "react";

interface DashboardSectionProps {
  children: ReactNode;
  span?: number;
}

export default function DashboardSection({
  children,
  span = 12,
}: DashboardSectionProps) {
  return (
    <section
      className={`xl:col-span-${span}`}
    >
      {children}
    </section>
  );
}
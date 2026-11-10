"use client";

import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div
      className="
        mx-auto
        flex
        max-w-[1700px]
        flex-col
        gap-8
      "
    >
      {children}
    </div>
  );
}
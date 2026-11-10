"use client";

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ChartCard({
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        `
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-2xl
        p-8
        `,
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#5D85D110,transparent_70%)]" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
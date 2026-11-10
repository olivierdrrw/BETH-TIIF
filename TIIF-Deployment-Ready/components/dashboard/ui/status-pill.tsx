"use client";

import { LiveDot } from "./live-dot";
import { cn } from "@/lib/utils";

interface StatusPillProps {
  children: React.ReactNode;
  className?: string;
}

export function StatusPill({
  children,
  className,
}: StatusPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-navy-500/20 bg-navy-500/10 px-3 py-1 text-xs font-medium text-navy-300 backdrop-blur-xl",
        className
      )}
    >
      <LiveDot />
      {children}
    </div>
  );
}
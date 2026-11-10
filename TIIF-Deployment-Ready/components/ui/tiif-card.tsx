"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TiifCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  interactive?: boolean;
}

export function TiifCard({
  className,
  glow = true,
  interactive = true,
  ...props
}: TiifCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-[28px] border border-white/10",
        "bg-white/[0.03] backdrop-blur-2xl",
        "shadow-[0_10px_40px_rgba(0,0,0,0.3)]",
        "transition-all duration-500 ease-out",
        interactive &&
          "hover:-translate-y-2 hover:border-navy-400/30 hover:bg-white/[0.06]",
        glow &&
          "before:absolute before:inset-0 before:rounded-[28px] before:bg-gradient-to-br before:from-navy-500/10 before:via-transparent before:to-navy-500/10 before:opacity-0 hover:before:opacity-100 before:transition",
        className
      )}
      {...props}
    />
  );
}
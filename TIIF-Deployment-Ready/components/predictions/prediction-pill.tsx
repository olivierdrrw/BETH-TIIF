"use client";

import { cn } from "@/lib/utils";

interface PredictionPillProps {
  label: string;
  variant?: "success" | "warning" | "danger" | "info";
}

const variants = {
  success: "bg-success-500/10 text-success-400 border-success-500/20",
  warning: "bg-navy-500/10 text-navy-400 border-navy-500/20",
  danger: "bg-red-500/10 text-red-400 border-red-500/20",
  info: "bg-navy-500/10 text-navy-400 border-navy-500/20",
};

export function PredictionPill({
  label,
  variant = "info",
}: PredictionPillProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant]
      )}
    >
      {label}
    </span>
  );
}
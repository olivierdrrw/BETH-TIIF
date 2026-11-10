import * as React from "react";
import { cn } from "@/lib/utils";

interface DashboardGridProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardGrid({
  className,
  ...props
}: DashboardGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        "md:grid-cols-2",
        "xl:grid-cols-4",
        className
      )}
      {...props}
    />
  );
}
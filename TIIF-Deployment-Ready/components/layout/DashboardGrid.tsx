import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardGridProps {
  children: ReactNode;
  className?: string;
}

export function DashboardGrid({
  children,
  className,
}: DashboardGridProps) {
  return (
    <section
      className={cn(
        "grid gap-8",
        "xl:grid-cols-12",
        className
      )}
    >
      {children}
    </section>
  );
}
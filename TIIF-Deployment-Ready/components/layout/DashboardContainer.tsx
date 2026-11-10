import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardContainerProps {
  children: ReactNode;
  className?: string;
}

export function DashboardContainer({
  children,
  className,
}: DashboardContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto",
        "w-full",
        "max-w-[1700px]",
        "px-6",
        "xl:px-10",
        "2xl:px-12",
        className
      )}
    >
      {children}
    </div>
  );
}
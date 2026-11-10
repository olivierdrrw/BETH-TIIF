import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardColumnProps {
  children: ReactNode;
  span?: 3 | 4 | 5 | 6 | 7 | 8 | 9 | 12;
}

export function DashboardColumn({
  children,
  span = 12,
}: DashboardColumnProps) {
  return (
    <div
      className={cn(
        "space-y-8",

        span === 12 && "xl:col-span-12",
        span === 9 && "xl:col-span-9",
        span === 8 && "xl:col-span-8",
        span === 7 && "xl:col-span-7",
        span === 6 && "xl:col-span-6",
        span === 5 && "xl:col-span-5",
        span === 4 && "xl:col-span-4",
        span === 3 && "xl:col-span-3"
      )}
    >
      {children}
    </div>
  );
}
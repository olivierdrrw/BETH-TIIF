import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardTitleProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
}

export function DashboardTitle({
  children,
  subtitle,
  className,
}: DashboardTitleProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h2
        className="
        text-xl
        font-semibold
        tracking-tight
        text-white
      "
      >
        {children}
      </h2>

      {subtitle && (
        <p
          className="
          text-sm
          leading-6
          text-slate-400
        "
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
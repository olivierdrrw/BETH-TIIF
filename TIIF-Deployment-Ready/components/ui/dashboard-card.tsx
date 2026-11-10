import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
}

export function DashboardCard({
  children,
  className,
}: DashboardCardProps) {
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

        backdrop-blur-3xl

        shadow-[0_10px_80px_rgba(0,0,0,.15)]

        transition-all
        duration-500

        hover:-translate-y-1
        hover:border-[#3E63B0]/30
        hover:shadow-[0_20px_100px_rgba(62, 99, 176,.15)]

        p-7
        `,
        className
      )}
    >
      {children}
    </div>
  );
}

export default DashboardCard;
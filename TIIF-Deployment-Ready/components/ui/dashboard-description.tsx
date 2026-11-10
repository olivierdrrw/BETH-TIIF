import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function DashboardDescription({
  children,
  className,
}: Props) {
  return (
    <p
      className={cn(
        "mt-2",
        "text-[15px]",
        "leading-7",
        "text-white/60",
        className
      )}
    >
      {children}
    </p>
  );
}
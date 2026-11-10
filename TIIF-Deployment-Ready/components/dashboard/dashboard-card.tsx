import { cn }
from "@/lib/utils";

interface Props {
  children: React.ReactNode;
}

export function DashboardCard({
  children,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-3xl",
        "border border-white/10",
        "bg-white/[0.02]",
        "backdrop-blur-xl",
        "p-6"
      )}
    >
      {children}
    </div>
  );
}
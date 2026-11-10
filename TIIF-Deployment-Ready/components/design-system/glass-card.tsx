import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        `
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        shadow-sm
        `,
        className
      )}
    >
      {children}
    </div>
  );
}
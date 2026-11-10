import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: ReactNode;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div className="rounded-xl border p-3">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
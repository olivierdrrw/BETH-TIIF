import * as React from "react";

interface DashboardSectionProps {
  title?: string;
  children: React.ReactNode;
}

export function DashboardSection({
  title,
  children,
}: DashboardSectionProps) {
  return (
    <section className="space-y-4">
      {title && (
        <h2 className="text-lg font-semibold">
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}
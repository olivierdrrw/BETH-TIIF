"use client";

import { ReactNode } from "react";

interface DashboardSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function DashboardSection({
  eyebrow,
  title,
  description,
  children,
}: DashboardSectionProps) {
  return (
    <section className="space-y-8">

      <div>

        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-navy-400">
            {eyebrow}
          </p>
        )}

        <h2 className="text-3xl font-semibold tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="mt-3 max-w-2xl text-slate-400">
            {description}
          </p>
        )}

      </div>

      {children}

    </section>
  );
}
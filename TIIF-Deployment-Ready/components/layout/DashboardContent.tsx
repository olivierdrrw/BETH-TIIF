import { ReactNode } from "react";

interface DashboardContentProps {
  children: ReactNode;
}

export function DashboardContent({
  children,
}: DashboardContentProps) {
  return (
    <main
      className="
        flex-1
        py-8
        space-y-8
      "
    >
      {children}
    </main>
  );
}
import { ReactNode } from "react";

import { DashboardContainer } from "./DashboardContainer";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardContent } from "./DashboardContent";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <DashboardContainer>

      <div
        className="
          flex
          gap-10
          min-h-screen
        "
      >
        <DashboardSidebar />

        <DashboardContent>
          {children}
        </DashboardContent>

      </div>

    </DashboardContainer>
  );
}
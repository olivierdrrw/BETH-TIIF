import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { HumanTwinSync } from "@/features/human-twin/components/human-twin-sync";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <HumanTwinSync />
      <DashboardShell>
        {children}
      </DashboardShell>
    </ProtectedRoute>
  );
}

export function RiskAlertsCard() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h3 className="text-lg font-semibold">
        Risk Monitoring
      </h3>

      <div className="mt-4 space-y-4">
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="font-medium">
            High Risk
          </p>

          <p className="text-sm text-muted-foreground">
            5 users require immediate attention.
          </p>
        </div>

        <div className="rounded-xl border border-navy-500/20 bg-navy-500/5 p-4">
          <p className="font-medium">
            Medium Risk
          </p>

          <p className="text-sm text-muted-foreground">
            22 users under observation.
          </p>
        </div>
      </div>
    </div>
  );
}
export async function
getTenantDashboard(
  tenantId: string
) {
  return {
    tenantId,

    users: 0,

    institutions: 0,

    activeSessions: 0,

    wellnessScore: 0,

    riskScore: 0,

    lastUpdated:
      new Date()
        .toISOString(),
  };
}
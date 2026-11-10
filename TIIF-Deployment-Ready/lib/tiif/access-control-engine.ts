export function
canAccessTenant(
  userTenantId: string,
  targetTenantId: string
) {
  return (
    userTenantId ===
    targetTenantId
  );
}
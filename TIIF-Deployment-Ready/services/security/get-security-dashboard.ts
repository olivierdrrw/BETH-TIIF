export async function
getSecurityDashboard() {
  return {
    activeSessions: 0,

    loginAttempts: 0,

    deniedRequests: 0,

    passwordResets: 0,

    lastUpdated:
      new Date()
        .toISOString(),
  };
}
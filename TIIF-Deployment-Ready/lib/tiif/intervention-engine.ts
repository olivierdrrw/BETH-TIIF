export function
getIntervention(
  riskScore:
    number
) {
  if (
    riskScore >= 90
  ) {
    return {
      priority:
        "critical",
      recommendation:
        "Immediate therapist intervention recommended.",
    };
  }

  if (
    riskScore >= 60
  ) {
    return {
      priority:
        "medium",
      recommendation:
        "Schedule wellness check-in and monitor emotional trends.",
    };
  }

  return {
    priority:
      "low",
    recommendation:
      "Continue wellness tracking.",
  };
}
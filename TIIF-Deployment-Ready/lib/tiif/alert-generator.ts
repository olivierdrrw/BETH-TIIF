import { nanoid }
from "nanoid";

export function
createRiskAlert(
  userId: string,
  riskScore: number
) {
  if (
    riskScore < 60
  ) {
    return null;
  }

  return {
    id: nanoid(),
    userId,
    title:
      "Mental Health Risk Alert",
    description:
      "Elevated emotional risk detected.",
    type:
      riskScore >= 90
        ? "critical"
        : "warning",
    read: false,
    createdAt:
      new Date()
        .toISOString(),
  };
}
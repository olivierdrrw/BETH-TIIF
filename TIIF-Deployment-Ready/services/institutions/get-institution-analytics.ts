import { getInstitutions } from "@/repositories/institution-repository";

export async function getInstitutionAnalytics() {
  const institutions = await getInstitutions();
  const wellnessScores = institutions
    .map((institution) => institution.wellnessScore)
    .filter((score): score is number => typeof score === "number" && Number.isFinite(score));

  return {
    totalInstitutions: institutions.length,
    totalUsers: institutions.reduce(
      (sum, institution) => sum + (institution.activeUsers ?? institution.memberCount ?? 0),
      0,
    ),
    averageWellness: wellnessScores.length === 0
      ? 0
      : Math.round(wellnessScores.reduce((sum, score) => sum + score, 0) / wellnessScores.length),
  };
}

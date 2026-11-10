import {
    getRegions,
  } from "@/repositories/region-repository";
  
  export async function
  getRegionalAnalytics() {
    const regions =
      await getRegions();
  
    return {
      totalRegions:
        regions.length,
  
      totalUsers:
        regions.reduce(
          (
            sum,
            region
          ) =>
            sum +
            region.activeUsers,
          0
        ),
  
      averageWellness:
        regions.length === 0
          ? 0
          : Math.round(
              regions.reduce(
                (
                  sum,
                  region
                ) =>
                  sum +
                  region.wellnessScore,
                0
              ) /
                regions.length
            ),
    };
  }
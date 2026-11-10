import {
    Region,
  } from "@/types/region";
  
  export function
  calculateNationalWellness(
    regions:
      Region[]
  ) {
    if (
      regions.length === 0
    ) {
      return 0;
    }
  
    const total =
      regions.reduce(
        (
          sum,
          region
        ) =>
          sum +
          region.wellnessScore,
        0
      );
  
    return Math.round(
      total /
        regions.length
    );
  }
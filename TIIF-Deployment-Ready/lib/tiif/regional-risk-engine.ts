import {
    Region,
  } from "@/types/region";
  
  export function
  calculateNationalRisk(
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
          region.riskScore,
        0
      );
  
    return Math.round(
      total /
        regions.length
    );
  }
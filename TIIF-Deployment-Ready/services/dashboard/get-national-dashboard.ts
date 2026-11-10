import {
    getRegions,
  } from "@/repositories/region-repository";
  
  import {
    calculateNationalWellness,
  } from "@/lib/tiif/wellness-index-engine";
  
  import {
    calculateNationalRisk,
  } from "@/lib/tiif/regional-risk-engine";
  
  export async function
  getNationalDashboard() {
    const regions =
      await getRegions();
  
    return {
      regions,
  
      nationalWellness:
        calculateNationalWellness(
          regions
        ),
  
      nationalRisk:
        calculateNationalRisk(
          regions
        ),
  
      totalRegions:
        regions.length,
    };
  }
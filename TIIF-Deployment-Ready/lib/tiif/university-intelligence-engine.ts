import {
    Institution,
  } from "@/types/institution";
  
  export function
  calculateUniversityIntelligence(
    universities:
      Institution[]
  ) {
    return {
      totalUniversities:
        universities.length,
  
      averageRisk:
        universities.length === 0
          ? 0
          : Math.round(
              universities.reduce(
                (
                  sum,
                  university
                ) =>
                  sum +
                  (university.riskScore ?? 0),
                0
              ) /
                universities.length
            ),
    };
  }
import {
    Institution,
  } from "@/types/institution";
  
  export function
  calculateSchoolIntelligence(
    schools:
      Institution[]
  ) {
    return {
      totalSchools:
        schools.length,
  
      averageWellness:
        schools.length === 0
          ? 0
          : Math.round(
              schools.reduce(
                (
                  sum,
                  school
                ) =>
                  sum +
                  (school.wellnessScore ?? 0),
                0
              ) /
                schools.length
            ),
    };
  }
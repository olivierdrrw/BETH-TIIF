import {
    Institution,
  } from "@/types/institution";
  
  export function
  calculateCorporateIntelligence(
    companies:
      Institution[]
  ) {
    return {
      totalCompanies:
        companies.length,
  
      averageWellness:
        companies.length === 0
          ? 0
          : Math.round(
              companies.reduce(
                (
                  sum,
                  company
                ) =>
                  sum +
                  (company.wellnessScore ?? 0),
                0
              ) /
                companies.length
            ),
    };
  }
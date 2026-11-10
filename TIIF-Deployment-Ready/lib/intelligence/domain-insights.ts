import {
  LifeDomainResults,
} from "@/features/life-domains/types/life-domain";

export function generateDomainInsights(
  domains: LifeDomainResults
) {

  const entries =
    Object.entries(domains);

  const strongest =
    entries.sort(
      (a, b) =>
        b[1] - a[1]
    )[0];

  const weakest =
    entries.sort(
      (a, b) =>
        a[1] - b[1]
    )[0];

  return {
    strongest:
      strongest[0],

    strongestScore:
      strongest[1],

    weakest:
      weakest[0],

    weakestScore:
      weakest[1],
  };
}
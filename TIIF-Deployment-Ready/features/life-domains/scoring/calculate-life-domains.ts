import {
  LifeDomainResults,
} from "../types/life-domain";

export function calculateLifeDomains(
  answers: Record<string, number>
): LifeDomainResults {

  const calculate =
    (keys: string[]) => {

      const total =
        keys.reduce(
          (sum, key) =>
            sum +
            (answers[key] || 0),
          0
        );

      return Math.round(
        (total /
          (keys.length * 4)) *
          100
      );
    };

  return {
    mental: calculate([
      "mental-1",
      "mental-2",
    ]),

    emotional: calculate([
      "emotional-1",
      "emotional-2",
    ]),

    identity: calculate([
      "identity-1",
      "identity-2",
    ]),

    relationships: calculate([
      "relationships-1",
      "relationships-2",
    ]),

    education: calculate([
      "education-1",
      "education-2",
    ]),

    career: calculate([
      "career-1",
      "career-2",
    ]),

    purpose: calculate([
      "purpose-1",
      "purpose-2",
    ]),

    physical: calculate([
      "physical-1",
      "physical-2",
    ]),
  };
}
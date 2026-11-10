export function calculateIdentityScore({

  valuesCount,

  strengthsCount,

  purposeLength,

  futureSelfLength,

}: any) {

  let score = 0;

  score += valuesCount * 5;

  score += strengthsCount * 5;

  score +=
    Math.min(
      purposeLength / 20,
      25
    );

  score +=
    Math.min(
      futureSelfLength / 20,
      25
    );

  return Math.round(score);
}
export function calculateIdentityScore({

  selfAwareness,

  valuesClarity,

  purposeClarity,

  decisionConfidence,

}: {

  selfAwareness: number;

  valuesClarity: number;

  purposeClarity: number;

  decisionConfidence: number;

}) {

  return Math.round(

    (
      selfAwareness +
      valuesClarity +
      purposeClarity +
      decisionConfidence
    ) / 4

  );
}
export function calculatePurposeScore(

  clarity: number,

  consistency: number,

  alignment: number

) {

  return Math.round(

    (
      clarity +
      consistency +
      alignment
    ) / 3

  );
}
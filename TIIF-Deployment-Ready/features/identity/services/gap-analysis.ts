export function calculateGapAnalysis({

  currentScore,

  futureScore,

}: {

  currentScore: number;

  futureScore: number;

}) {

  return {

    gap:
      futureScore -
      currentScore,

    progress:
      Math.round(

        (
          currentScore /
          futureScore
        ) * 100

      ),

  };
}
export function calculateMoodTrend(

  currentMood: number,

  previousMood: number

) {

  return (
    currentMood -
    previousMood
  );
}
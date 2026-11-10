const positiveWords = [
  "happy",
  "grateful",
  "hopeful",
  "excited",
];

const negativeWords = [
  "sad",
  "angry",
  "stressed",
  "anxious",
];

export function analyzeSentiment(
  text: string
) {

  const content =
    text.toLowerCase();

  let score = 0;

  positiveWords.forEach(
    (word) => {
      if (
        content.includes(word)
      ) {
        score += 1;
      }
    }
  );

  negativeWords.forEach(
    (word) => {
      if (
        content.includes(word)
      ) {
        score -= 1;
      }
    }
  );

  return score;
}
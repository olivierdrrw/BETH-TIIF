import {
  AssessmentAnswer,
} from "../types/assessment";

export function calculateTraumaScore(
  answers: AssessmentAnswer[]
) {

  const total =
    answers.reduce(
      (sum, answer) =>
        sum + answer.score,
      0
    );

  const maxScore =
    answers.length * 4;

  return Math.round(
    (total / maxScore) * 100
  );
}
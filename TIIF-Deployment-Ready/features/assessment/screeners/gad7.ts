export const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

export const GAD7_OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export function scoreGAD7(answers: number[]) {
  const total = answers.reduce((sum, v) => sum + v, 0);

  let severity: "minimal" | "mild" | "moderate" | "severe";
  if (total <= 4) severity = "minimal";
  else if (total <= 9) severity = "mild";
  else if (total <= 14) severity = "moderate";
  else severity = "severe";

  return { total, severity };
}

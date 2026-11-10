export const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure",
  "Trouble concentrating on things",
  "Moving or speaking noticeably slowly, or being fidgety/restless",
  "Thoughts that you would be better off dead, or of hurting yourself",
];

export const PHQ9_OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export function scorePHQ9(answers: number[]) {
  const total = answers.reduce((sum, v) => sum + v, 0);

  let severity: "minimal" | "mild" | "moderate" | "moderately_severe" | "severe";
  if (total <= 4) severity = "minimal";
  else if (total <= 9) severity = "mild";
  else if (total <= 14) severity = "moderate";
  else if (total <= 19) severity = "moderately_severe";
  else severity = "severe";

  return { total, severity };
}

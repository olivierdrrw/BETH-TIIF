export interface DetectedPattern {
  title: string;

  confidence: number;
}

export function detectPatterns() {
  return [
    {
      title:
        "Stress increases during exams",
      confidence: 87,
    },

    {
      title:
        "Mood improves after journaling",
      confidence: 81,
    },
  ];
}
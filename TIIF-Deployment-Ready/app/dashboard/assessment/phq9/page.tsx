import { ScreenerFlow } from "@/features/assessment/screeners/screener-flow";
import { PHQ9_QUESTIONS, PHQ9_OPTIONS, scorePHQ9 } from "@/features/assessment/screeners/phq9";

export default function PHQ9Page() {
  return (
    <ScreenerFlow
      screenerId="phq9"
      title="PHQ-9 Depression Screening"
      questions={PHQ9_QUESTIONS}
      options={PHQ9_OPTIONS}
      score={scorePHQ9}
      maxScore={27}
    />
  );
}

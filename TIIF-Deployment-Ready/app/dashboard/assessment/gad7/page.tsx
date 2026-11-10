import { ScreenerFlow } from "@/features/assessment/screeners/screener-flow";
import { GAD7_QUESTIONS, GAD7_OPTIONS, scoreGAD7 } from "@/features/assessment/screeners/gad7";

export default function GAD7Page() {
  return (
    <ScreenerFlow
      screenerId="gad7"
      title="GAD-7 Anxiety Screening"
      questions={GAD7_QUESTIONS}
      options={GAD7_OPTIONS}
      score={scoreGAD7}
      maxScore={21}
    />
  );
}

export class PredictionEngine {
  static burnout(score: number) {
    if (score > 80) return 15;

    if (score > 60) return 30;

    return 55;
  }

  static wellbeing(current: number) {
    return current + 6;
  }

  static resilience(current: number) {
    return current + 4;
  }
}
export class HumanTwinService {
  static calculateGrowth(
    identity: number,
    wellbeing: number,
    resilience: number
  ) {
    return Math.round(
      (identity + wellbeing + resilience) / 3
    );
  }
}
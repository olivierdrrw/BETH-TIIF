export interface TrendPoint {
    date: string;
    value: number;
  }
  
  export function
  calculateTrend(
    points:
      TrendPoint[]
  ) {
    if (
      points.length < 2
    ) {
      return "stable";
    }
  
    const first =
      points[0].value;
  
    const last =
      points[
        points.length - 1
      ].value;
  
    if (last > first) {
      return "up";
    }
  
    if (last < first) {
      return "down";
    }
  
    return "stable";
  }
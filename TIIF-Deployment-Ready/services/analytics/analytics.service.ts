export function generateAnalyticsSeries(
  current: number,
  points = 30
) {
  const series: number[] = [];

  let value = current - points;

  for (let i = 0; i < points; i++) {
    value += Math.random() * 2;
    series.push(Math.round(value));
  }

  return series;
}
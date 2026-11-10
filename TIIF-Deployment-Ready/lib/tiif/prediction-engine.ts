export function
predictNextValue(
  values:
    number[]
) {
  if (
    values.length === 0
  ) {
    return 0;
  }

  const average =
    values.reduce(
      (
        sum,
        value
      ) =>
        sum + value,
      0
    ) /
    values.length;

  return Math.round(
    average
  );
}
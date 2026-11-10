export function
detectPattern(
  emotions:
    string[]
) {
  const counts:
    Record<
      string,
      number
    > = {};

  emotions.forEach(
    (
      emotion
    ) => {
      counts[
        emotion
      ] =
        (
          counts[
            emotion
          ] ?? 0
        ) + 1;
    }
  );

  const dominant =
    Object.entries(
      counts
    ).sort(
      (
        a,
        b
      ) =>
        b[1] -
        a[1]
    )[0];

  return (
    dominant?.[0] ??
    "calm"
  );
}
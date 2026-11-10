export function
exportResearchData(
  data: unknown
) {
  return JSON.stringify(
    data,
    null,
    2
  );
}
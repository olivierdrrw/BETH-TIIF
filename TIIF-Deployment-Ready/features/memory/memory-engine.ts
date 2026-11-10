export function createMemory(
  content: string,
  category: string
) {
  return {
    id:
      crypto.randomUUID(),

    content,

    category,

    createdAt:
      new Date()
        .toISOString(),
  };
}
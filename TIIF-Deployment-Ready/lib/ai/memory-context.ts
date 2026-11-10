export interface MemoryContextRecord {
  type: string;
  title: string;
  content: string;
}

export function buildMemoryContext(memories: MemoryContextRecord[]): string {
  return memories
    .slice(0, 15)
    .map((memory) => `[${memory.type}] ${memory.title}: ${memory.content}`)
    .join("\n");
}

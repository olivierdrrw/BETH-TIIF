import { MemoryRecord } from "./memory";

export interface HumanTwinMemory {
  memories: MemoryRecord[];

  totalMemories: number;

  lastUpdated: string;
}
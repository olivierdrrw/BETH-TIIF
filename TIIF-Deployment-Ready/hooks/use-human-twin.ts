import { useHumanTwinStore } from "@/features/human-twin/store/use-human-twin-store";

export function useHumanTwin() {
  return useHumanTwinStore();
}
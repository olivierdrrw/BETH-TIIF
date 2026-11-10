import { Signals } from "@/types/signals";

export function createIntervention(
  signals: Signals
) {
  if (signals.risk > 80) {
    return {
      level: "urgent",
      title: "Immediate Support",
    };
  }

  if (signals.connection < 40) {
    return {
      level: "support",
      title: "Trusted Circle Activation",
    };
  }

  return {
    level: "awareness",
    title: "Growth Reflection",
  };
}
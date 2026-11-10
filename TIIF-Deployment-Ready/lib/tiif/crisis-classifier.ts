import {
    EmotionTag,
  } from "@/types/memory";
  
  export type CrisisLevel =
    | "none"
    | "low"
    | "medium"
    | "high";
  
  export function
  classifyCrisis(
    emotion:
      EmotionTag
  ): CrisisLevel {
    switch (
      emotion
    ) {
      case "happy":
      case "calm":
      case "hopeful":
        return "none";
  
      case "confused":
        return "low";
  
      case "anxious":
      case "stressed":
        return "medium";
  
      case "sad":
      case "angry":
        return "high";
  
      default:
        return "low";
    }
  }
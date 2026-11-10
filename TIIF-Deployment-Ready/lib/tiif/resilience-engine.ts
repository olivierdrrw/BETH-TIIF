import {
    EmotionTag,
  } from "@/types/memory";
  
  export function
  calculateResilience(
    emotion:
      EmotionTag
  ) {
    switch (
      emotion
    ) {
      case "happy":
        return 90;
  
      case "hopeful":
        return 85;
  
      case "calm":
        return 80;
  
      case "confused":
        return 65;
  
      case "anxious":
        return 55;
  
      case "stressed":
        return 50;
  
      case "sad":
        return 45;
  
      case "angry":
        return 40;
  
      default:
        return 60;
    }
  }
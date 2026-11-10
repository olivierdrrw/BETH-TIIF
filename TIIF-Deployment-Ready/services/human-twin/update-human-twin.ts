import {
    getDominantEmotion,
  } from "@/lib/tiif/emotion-aggregator";
  
  import {
    calculateGrowth,
  } from "@/lib/tiif/growth-engine";
  
  import {
    calculateResilience,
  } from "@/lib/tiif/resilience-engine";
  
  import {
    calculateWellness,
  } from "@/lib/tiif/wellness-engine";
  
  import type { MemoryRecord, EmotionTag } from "@/types/memory";
  
  export function
  updateHumanTwin(
    memories:
      MemoryRecord[]
  ) {
    const
      dominantEmotion =
        getDominantEmotion(
          memories
        );
  
    const
      growthScore =
        calculateGrowth(
          memories.length
        );
  
    const
      resilienceScore =
        calculateResilience(
          dominantEmotion as EmotionTag
        );
  
    const
      wellnessScore =
        calculateWellness(
          growthScore,
          resilienceScore
        );
  
    return {
      dominantEmotion,
      growthScore,
      resilienceScore,
      wellnessScore,
      totalReflections:
        memories.length,
      lastUpdated:
        new Date()
          .toISOString(),
    };
  }
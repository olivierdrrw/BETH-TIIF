export interface AnalyticsState {
    growthScore: number;      // Overall growth (0-100)
    wellnessIndex: number;    // Daily mental health quality (0-100)
    reflectionCount: number;  // How many times they journaled
    stressLevel: number;      // Current stress (0-100, lower is better)
    emotionalBalance: number; // Stability (0-100)
    lastUpdated: number;
  }
  
  export function updateAnalytics(state: AnalyticsState, emotion: string): AnalyticsState {
    const newState = { ...state };
  
    newState.reflectionCount += 1;
  
    // Advanced MVP Rules for TIIF
    switch (emotion.toLowerCase()) {
      case "motivated":
      case "inspired":
        newState.growthScore += 2;
        newState.wellnessIndex += 1.5;
        newState.emotionalBalance += 2;
        newState.stressLevel -= 2;
        break;
      case "sad":
      case "down":
        newState.stressLevel += 2;
        newState.wellnessIndex -= 2;
        break;
      case "anxious":
      case "panic":
        newState.stressLevel += 3.5;
        newState.emotionalBalance -= 3;
        break;
      case "calm":
      case "peaceful":
        newState.stressLevel -= 3;
        newState.emotionalBalance += 2;
        newState.wellnessIndex += 1;
        break;
    }
  
    // Ensure values strictly stay between 0 and 100
    const clamp = (val: number) => Math.max(0, Math.min(100, val));
    
    newState.growthScore = clamp(newState.growthScore);
    newState.wellnessIndex = clamp(newState.wellnessIndex);
    newState.stressLevel = clamp(newState.stressLevel);
    newState.emotionalBalance = clamp(newState.emotionalBalance);
    newState.lastUpdated = Date.now();
  
    return newState;
  }
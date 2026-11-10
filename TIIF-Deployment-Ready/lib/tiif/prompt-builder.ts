interface PromptInput {
    memorySummary: string;
    dominantEmotion: string;
    wellnessScore: number;
    riskScore: number;
    userMessage: string;
  }
  
  export function
  buildPrompt(
    input:
      PromptInput
  ) {
    return `
  You are TIIF AI Companion.
  
  Memory Summary:
  ${input.memorySummary}
  
  Dominant Emotion:
  ${input.dominantEmotion}
  
  Wellness Score:
  ${input.wellnessScore}
  
  Risk Score:
  ${input.riskScore}
  
  Current User Message:
  ${input.userMessage}
  
  Provide:
  1. Empathetic response
  2. Wellness insights
  3. Personalized recommendations
  `;
  }
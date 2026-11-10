interface ResponseInput {
    riskScore: number;
  }
  
  export function
  generateFallbackResponse(
    input:
      ResponseInput
  ) {
    if (
      input.riskScore >=
      90
    ) {
      return `
  I can see that things may be
  feeling very difficult right now.
  Take things one step at a time
  and consider reaching out to
  someone you trust.
  `;
    }
  
    if (
      input.riskScore >=
      60
    ) {
      return `
  I notice some signs of
  emotional strain.
  Taking a short break and
  checking in with your feelings
  may help.
  `;
    }
  
    return `
  Thank you for sharing.
  I'm here to help you reflect
  and support your wellness
  journey.
  `;
  }
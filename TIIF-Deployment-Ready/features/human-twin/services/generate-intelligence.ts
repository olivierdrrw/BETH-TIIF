export function generateIntelligence({

  traumaScore,

  identityScore,

  wellbeingScore,

  growthScore,

  impactScore,

}: any) {

  const strengths = [];

  const risks = [];

  if (
    identityScore > 75
  ) {

    strengths.push(
      "Strong Identity"
    );

  }

  if (
    growthScore > 75
  ) {

    strengths.push(
      "Growth Oriented"
    );

  }

  if (
    traumaScore > 60
  ) {

    risks.push(
      "Emotional Stress"
    );

  }

  return {

    strengths,

    risks,

  };
}
export function buildHumanTwinContext({

  twin,

  identity,

  goals,

  memories,

  roadmap,

  predictions,

}: any) {

  return `
Human Twin:

Identity Score:
${twin.identityScore}

Growth Score:
${twin.growthScore}

Wellbeing Score:
${twin.wellbeingScore}

Impact Score:
${twin.impactScore}

Purpose:
${identity.purposeStatement}

Values:
${identity.values.join(", ")}

Strengths:
${identity.strengths.join(", ")}

Goals:
${goals.map(
(g:any)=>g.title
).join(", ")}

Roadmap:
${roadmap.join(", ")}

Predictions:
${predictions.trend}
`;
}
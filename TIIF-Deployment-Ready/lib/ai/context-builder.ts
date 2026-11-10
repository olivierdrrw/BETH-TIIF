import { buildTwinContext } from "./human-twin-context";
import { buildMemoryContext } from "./memory-context";
import { buildRiskContext } from "./risk-context";

export function buildContext({
  twin,
  memories,
  riskScore,
}: any) {
  return `
${buildTwinContext(twin)}

${buildMemoryContext(memories)}

${buildRiskContext(riskScore)}
`;
}
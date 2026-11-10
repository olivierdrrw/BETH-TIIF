import { calculateScores } from "@/core/human-twin/score-engine";
import { generateInsights } from "./insight-engine";
import { generatePrediction } from "./prediction-engine";
import { generateRoadmap } from "./roadmap-engine";

export async function generateHumanTwin({

 userId,

 identity,

 purpose,

 domains,

 goals,

}: any) {

 const scores =
 calculateScores({

  identity,

  purpose,

  domains,

 });

 const insights =
 generateInsights(scores);

 const prediction =
 generatePrediction(scores);

 const roadmap =
 generateRoadmap();

 function deriveEmotionalState(s: typeof scores): string {
  const avg = (s.wellbeingScore + s.resilienceScore) / 2;
  if (avg >= 75) return "Calm";
  if (avg >= 55) return "Steady";
  if (avg >= 35) return "Adjusting";
  return "Stressed";
 }

 return {

  userId,

  version: "1.0",

  ...scores,

  emotionalState: deriveEmotionalState(scores),

  insights,

  prediction,

  roadmap,

  currentXP: 0,

  currentLevel: 1,

  avatarLevel: "Seed",

  generatedAt:
   new Date().toISOString(),

 };

}
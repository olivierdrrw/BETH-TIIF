"use client";

import { useEffect } from "react";

import { PredictionEngine } from "../engine/prediction.engine";

import { useAIStore } from "../store/use-ai-store";

import { useHumanTwinStore } from "@/features/human-twin/store/use-human-twin-store";

export function useAIInsight(){

const twin=
useHumanTwinStore();

const setInsight=
useAIStore(s=>s.setInsight);

useEffect(()=>{

setInsight(

PredictionEngine.generate(twin)

);

},[
twin.identity,
twin.growth,
twin.wellbeing,
twin.aiConfidence
]);

}
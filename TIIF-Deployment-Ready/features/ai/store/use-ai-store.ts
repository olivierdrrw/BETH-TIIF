"use client";

import { create } from "zustand";
import { AIInsight } from "../types/ai-insight";

interface AIState{

insight:AIInsight | null;

setInsight:(data:AIInsight)=>void;

}

export const useAIStore=create<AIState>((set)=>({

insight:null,

setInsight:(data)=>set({

insight:data

})

}));
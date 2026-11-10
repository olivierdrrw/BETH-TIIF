"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";

import AIHeader from "./ai-header";
import { AIThinking } from "./ai-thinking";
import AIObservation from "./ai-observation";
import AIRecommendation from "./ai-recommendation";
import AIConfidence from "./ai-confidence";
import AIAction from "./ai-action";

export default function AICompanion() {

  return (

    <DashboardCard className="space-y-8">

      <AIHeader/>

      <AIThinking/>

      <AIObservation/>

      <AIRecommendation/>

      <AIConfidence/>

      <AIAction/>

    </DashboardCard>

  );

}
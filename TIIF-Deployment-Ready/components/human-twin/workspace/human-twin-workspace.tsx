"use client";

import DashboardLayout from "@/components/dashboard/layout/dashboard-layout";
import DashboardGrid from "@/components/dashboard/layout/dashboard-grid";
import DashboardSection from "@/components/dashboard/layout/dashboard-section";

import HumanTwinHero from "../hero/hero";
import IdentityDNA from "@/components/identity/identity-dna";
import BrainMap from "../brain-map";
import PredictionCard from "@/components/predictions/prediction-card";
import HumanTwinTimeline from "../timeline";
import LifeDomains from "../life-domains";
import { GoalsCard } from "@/components/growth-journey/goals-card";
import AIRecommendations from "../ai-recommendations";

export default function HumanTwinWorkspace() {
  return (
    <DashboardLayout>

      <HumanTwinHero />

      <DashboardGrid>

        <DashboardSection span={6}>
          <IdentityDNA />
        </DashboardSection>

        <DashboardSection span={6}>
          <BrainMap />
        </DashboardSection>

      </DashboardGrid>

      <DashboardGrid>

        <DashboardSection span={6}>
          <PredictionCard />
        </DashboardSection>

        <DashboardSection span={6}>
          <LifeDomains />
        </DashboardSection>

      </DashboardGrid>

      <HumanTwinTimeline />

      <DashboardGrid>

        <DashboardSection span={6}>
          <GoalsCard />
        </DashboardSection>

        <DashboardSection span={6}>
          <AIRecommendations />
        </DashboardSection>

      </DashboardGrid>

    </DashboardLayout>
  );
}
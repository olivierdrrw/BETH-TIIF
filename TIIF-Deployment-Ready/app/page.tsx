import { Navbar } from "@/components/landing/navbar/Navbar";

import { Hero } from "@/components/landing/hero/Hero";
import { Problem } from "@/components/landing/problem/Problem";
import { Solution } from "@/components/landing/solution/Solution";
import { HumanTwin } from "@/components/landing/human-twin/HumanTwin";
import { AICompanion } from "@/components/landing/ai/AICompanion";
import { IdentityIntelligence } from "@/components/landing/Identity/IdentityIntelligence";
import { FeatureShowcase } from "@/components/landing/platform/FeatureShowcase";
import { EnterpriseIntelligence } from "@/components/landing/platform/EnterpriseIntelligence";
import { TrustedCircle } from "@/components/landing/platform/TrustedCircle";
import { Ecosystem } from "@/components/landing/platform/Ecosystem";
import { VoiceDemo } from "@/components/landing/platform/VoiceDemo";
import { VisionStatement } from "@/components/landing/platform/VisionStatement";
import { Institutions } from "@/components/landing/Institutions/Institutions";
import { Impact } from "@/components/landing/impact/Impact";
import { HowItWorks } from "@/components/landing/story/HowItWorks";
import { WhyTiif } from "@/components/landing/story/WhyTiif";
import { Future } from "@/components/landing/Future/Future";
import { Testimonials } from "@/components/landing/Testimonials/Testimonials";
import { FAQ } from "@/components/landing/FAQ/FAQ";
import { CTA } from "@/components/landing/CTA/CTA";
import { Footer } from "@/components/landing/footer/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden bg-white text-slate-900 dark:bg-[#061321] dark:text-white">

        <div className="pt-24">
          <Hero />
        </div>

        <Problem />
        <Solution />
        <HumanTwin />
        <AICompanion />
        <IdentityIntelligence />
        <div id="platform">
          <FeatureShowcase />
        </div>
        <EnterpriseIntelligence />
        <TrustedCircle />
        <Ecosystem />
        <VoiceDemo />
        <div id="about">
          <VisionStatement />
        </div>
        <div id="solutions">
          <Institutions />
        </div>
        <Impact />
        <HowItWorks />
        <div id="why-tiif">
          <WhyTiif />
        </div>
        <Future />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />

      </main>
    </>
  );
}
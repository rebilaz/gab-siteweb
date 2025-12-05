"use client";

import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import ContentSections from "./ContentSections";
import FinalCTASection from "./FinalCTASection";

// 🔹 Type exporté pour ContentSections
export type LandingSection = {
  id?: string;
  title: string;
  text?: string;
  bullets?: string[];
};

type LandingLayoutProps = {
  niche: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaLabel: string;
  sections: LandingSection[];
  onPrimaryCtaClick?: () => void;
};

const LandingLayout: React.FC<LandingLayoutProps> = ({
  niche,
  heroTitle,
  heroSubtitle,
  primaryCtaLabel,
  sections,
  onPrimaryCtaClick,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-16 space-y-28 lg:space-y-32">
        <HeroSection
          niche={niche}
          heroTitle={heroTitle}
          heroSubtitle={heroSubtitle}
          primaryCtaLabel={primaryCtaLabel}
          onPrimaryCtaClick={onPrimaryCtaClick}
        />

        <FeaturesSection />

        <ContentSections sections={sections} />

        <FinalCTASection
          niche={niche}
          primaryCtaLabel={primaryCtaLabel}
          onPrimaryCtaClick={onPrimaryCtaClick}
        />
      </main>
    </div>
  );
};

export default LandingLayout;

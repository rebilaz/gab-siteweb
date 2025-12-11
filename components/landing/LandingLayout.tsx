// components/landing/LandingLayout.tsx
"use client";

import React, { useEffect, useCallback } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import ContentSections from "./ContentSections";
import FinalCTASection from "./FinalCTASection";
import { setupPageTracking } from "@/lib/tracking";

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
};

const LandingLayout: React.FC<LandingLayoutProps> = ({
  niche,
  heroTitle,
  heroSubtitle,
  primaryCtaLabel,
  sections,
}) => {
  // Tracking page
  useEffect(() => {
    console.log("[LandingLayout] setupPageTracking()");
    setupPageTracking();
  }, []);

  // Scroll vers la section #contact quand on clique sur le CTA
  const handlePrimaryCtaClick = useCallback(() => {
    const offset = 72;
    const el = document.querySelector("#contact") as HTMLElement | null;

    if (!el) {
      console.warn("[LandingLayout] Élément #contact introuvable");
      return;
    }

    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-16 space-y-28 lg:space-y-32">
        <HeroSection
          niche={niche}
          heroTitle={heroTitle}
          heroSubtitle={heroSubtitle}
          primaryCtaLabel={primaryCtaLabel}
          onPrimaryCtaClick={handlePrimaryCtaClick}
        />

        <FeaturesSection />

        <ContentSections sections={sections} />

        <FinalCTASection
          niche={niche}
          primaryCtaLabel={primaryCtaLabel}
          onPrimaryCtaClick={handlePrimaryCtaClick}
        />
      </main>
    </div>
  );
};

export default LandingLayout;

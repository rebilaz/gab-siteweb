// page.tsx
"use client";

import React, { useEffect } from "react";
import Header  from "@/components/Header"; // 👈 on importe LandingHeader
import Hero from "@/components/sections/Hero";
import Approach from "@/components/sections/Approach";
import TestimonialsSection from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { setupPageTracking } from "@/lib/tracking";

const LandingPage: React.FC = () => {
  const year = new Date().getFullYear();

  useEffect(() => {
    console.log("[LandingPage] useEffect -> setupPageTracking()");
    setupPageTracking();
  }, []);

  const scrollToSelector = (selector: string) => {
    console.log("[LandingPage] scrollToSelector", selector);

    const offset = 72;
    const el =
      selector === "top"
        ? document.body
        : (document.querySelector(selector) as HTMLElement | null);

    if (!el) {
      console.warn(
        "[LandingPage] Élément introuvable pour le sélecteur",
        selector
      );
      return;
    }

    const top =
      selector === "top"
        ? 0
        : el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleFormSubmit = (data: FormData) => {
    const obj = Object.fromEntries(data.entries());
    console.log("[LandingPage] Form submit :", obj);
    // plus tard tu pourras faire: trackEvent("Lead", 1, { source: "contact_form" })
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* 👉 Utilise le bon nom de composant : LandingHeader */}
      <Header niche="SaaS Builder" />

      <main className="flex-1">
        <Hero scrollTo={scrollToSelector} />
        <Approach />
        <TestimonialsSection />
        <Contact onSubmit={handleFormSubmit} />
      </main>

      {/* 👉 Footer ne reçoit plus scrollTo car FooterProps ne le prévoit pas */}
      <Footer year={year} />
    </div>
  );
};

export default LandingPage;

// page.tsx
"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Approach from "@/components/sections/Approach";
import TestimonialsSection from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { setupPageTracking } from "@/lib/tracking";

const LandingPage: React.FC = () => {
  const year = new Date().getFullYear();

  useEffect(() => {
    setupPageTracking();
  }, []);

  const scrollToSelector = (selector: string) => {
    const offset = 72;
    const el =
      selector === "top"
        ? document.body
        : (document.querySelector(selector) as HTMLElement | null);

    if (!el) return;

    const top =
      selector === "top"
        ? 0
        : el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleFormSubmit = (data: FormData) => {
    console.log("Form data:", Object.fromEntries(data.entries()));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header scrollTo={scrollToSelector} />
      <main className="flex-1">
        <Hero scrollTo={scrollToSelector} />
        <Approach />
        <TestimonialsSection />
        <Contact onSubmit={handleFormSubmit} />
      </main>
      <Footer year={year} scrollTo={scrollToSelector} />
    </div>
  );
};

export default LandingPage;

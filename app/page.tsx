"use client";

import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Approach from "@/components/sections/Approach";
import TestimonialsSection from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";


const LandingPage: React.FC = () => {
  const year = new Date().getFullYear();

  // Scroll doux vers les sections
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

  // Simule un envoi de formulaire (tu pourras brancher ton backend ou n8n ici)
  const handleFormSubmit = (data: FormData) => {
    console.log("Form data:", Object.fromEntries(data.entries()));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Header */}
      <Header scrollTo={scrollToSelector} />

      {/* Contenu principal */}
      <main className="flex-1">
        <Hero scrollTo={scrollToSelector} />
        <Approach /> {/* ← fond gris clair */}
        <TestimonialsSection />
        <Contact onSubmit={handleFormSubmit} />
      </main>

      {/* Footer */}
      <Footer year={year} scrollTo={scrollToSelector} />
    </div>
  );
};

export default LandingPage;

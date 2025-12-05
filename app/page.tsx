// app/page.tsx
"use client";

import React, { useEffect } from "react";
import LandingLayout, {
  LandingSection,
} from "@/components/landing/LandingLayout";
import { setupPageTracking } from "@/lib/tracking";

const LandingPage: React.FC = () => {
  useEffect(() => {
    console.log("[LandingPage] useEffect -> setupPageTracking()");
    setupPageTracking();
  }, []);

  // 👉 utilisé par le CTA principal du hero
  const handlePrimaryCtaClick = () => {
    const offset = 72;
    const el = document.querySelector("#contact") as HTMLElement | null;

    if (!el) {
      console.warn("[LandingPage] Élément #contact introuvable");
      return;
    }

    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleFormSubmit = (data: FormData) => {
    const obj = Object.fromEntries(data.entries());
    console.log("[LandingPage] Form submit :", obj);
    // plus tard: trackEvent("Lead", 1, { source: "contact_form" })
  };

  // 👉 Contenu des blocs de texte du LandingLayout
  const sections: LandingSection[] = [
    {
      id: "systems",
      title: "Des systèmes qui travaillent pour toi",
      text: `Je connecte tes outils (CRM, facturation, email, formulaires…) pour que l’info circule automatiquement, sans copier-coller ni perte de données.`,
      bullets: [
        "Intégrations entre tes outils existants (Notion, HubSpot, Airtable, etc.)",
        "Automatisations pour les tâches répétitives (onboarding, relances, reporting…)",
        "Moins d’ops manuels, plus de temps sur le cœur de ton activité",
      ],
    },
    {
      id: "dashboards",
      title: "Des dashboards clairs pour piloter ton business",
      text: `Fini les fichiers Excel impossibles à maintenir : tu as une vue simple et à jour de ce qui compte vraiment pour ton activité.`,
      bullets: [
        "Vue consolidée de tes chiffres clés (CA, MRR, leads, conversions…)",
        "Dashboards pensés pour toi, pas pour les développeurs",
        "Mise à jour automatique à partir de tes outils existants",
      ],
    },
    {
      id: "process",
      title: "Un process simple, sans jargon technique",
      text: `On travaille ensemble de façon concrète : tu m’expliques ton fonctionnement, je traduis ça en systèmes, automatisations et dashboards utiles.`,
      bullets: [
        "On part de ton workflow réel, pas d’un template générique",
        "Tu valides chaque étape avant la mise en production",
        "Une fois livré, tu gardes le contrôle et la propriété du système",
      ],
    },
  ];

  return (
    <>
      <LandingLayout
        niche="SaaS Builder"
        heroTitle="Systèmes & dashboards pour piloter ton business simplement"
        heroSubtitle="Je connecte tes outils, j’automatise tes process et je crée des dashboards pour que tu saches exactement ce qui se passe dans ton entreprise."
        primaryCtaLabel="Parler de ton projet"
        sections={sections}
        onPrimaryCtaClick={handlePrimaryCtaClick}
      />
      {/* Quand ton composant Contact sera prêt avec un id="contact",
          tu pourras le rendre ici et utiliser handleFormSubmit : */}
      {/*
      <Contact onSubmit={handleFormSubmit} />
      */}
    </>
  );
};

export default LandingPage;

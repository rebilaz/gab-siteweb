// app/page.tsx

import type { Metadata } from "next";
import LandingLayout, {
  LandingSection,
} from "@/components/landing/LandingLayout";

// ✅ Balises SEO + canonical pour la home
export const metadata: Metadata = {
  title: "Vexly – Systèmes, automatisations et dashboards pour ton business",
  description:
    "Je connecte tes outils, j’automatise tes process et je crée des dashboards pour que tu pilotes ton activité sans te perdre dans la technique.",
  alternates: {
    canonical: "https://www.vexly.fr/",
  },
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

export default function LandingPage() {
  return (
    <LandingLayout
      niche="SaaS Builder"
      heroTitle="Systèmes & dashboards pour piloter ton business simplement"
      heroSubtitle="Je connecte tes outils, j’automatise tes process et je crée des dashboards pour que tu saches exactement ce qui se passe dans ton entreprise."
      primaryCtaLabel="Parler de ton projet"
      sections={sections}
    />
  );
}

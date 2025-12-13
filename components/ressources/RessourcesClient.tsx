"use client";

import { useState } from "react";
import type { Article } from "@/lib/articles";

import { RessourcesHero } from "./RessourcesHero";
import { QuickIntentions } from "./QuickIntentions";
import { PrimaryChoices } from "./PrimaryChoices";
import { LatestArticlesSection } from "./LatestArticlesSection";
import { ParcoursSection } from "./ParcoursSection";

export type Parcours = {
  slug: string;
  title: string;
  desc: string;
  meta: string;
};

const PARCOURS: Parcours[] = [
  { slug: "valider-une-idee", title: "Valider une idée", desc: "Signaux forts, demande, concurrence.", meta: "3 étapes • 2h" },
  { slug: "trouver-une-idee-rentable", title: "Trouver une idée rentable", desc: "Méthode simple pour éviter les fausses bonnes idées.", meta: "4 étapes • 3h" },
  { slug: "construire-un-mvp", title: "Construire un MVP", desc: "Prioriser, cadrer, livrer vite.", meta: "5 étapes • 4h" },
];

const INTENTIONS = [
  { label: "Je cherche une idée", href: "/parcours/trouver-une-idee-rentable" },
  { label: "Je veux valider mon marché", href: "/parcours/valider-une-idee" },
  { label: "Je lance mon MVP", href: "/parcours/construire-un-mvp" },
  { label: "Je cherche un guide spécifique", href: "/articles" },
];

export default function RessourcesClient({ latestArticles }: { latestArticles: Article[] }) {
  const [hoveredSection, setHoveredSection] =
    useState<"articles" | "parcours" | null>(null);

  return (
    <main className="min-h-screen bg-slate-50/50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <RessourcesHero />
        <QuickIntentions intentions={INTENTIONS} />
        <PrimaryChoices
          parcours={PARCOURS}
          hoveredSection={hoveredSection}
          setHoveredSection={setHoveredSection}
        />
        <LatestArticlesSection latestArticles={latestArticles} />
        <ParcoursSection parcours={PARCOURS} />
      </div>
    </main>
  );
}

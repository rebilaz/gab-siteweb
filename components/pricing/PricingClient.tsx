"use client";

import { PricingHero } from "./PricingHero";
import { PricingPlans } from "./PricingPlans";
import { PricingReassurance } from "./PricingReassurance";

export type PricingPlan = {
  name: string;
  highlight: string;
  price: string;
  badge: string;
  featured?: boolean;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref?: string; // pour Custom
};

const PLANS: PricingPlan[] = [
  {
    name: "Starter",
    highlight: "Pour lancer ton 1er SaaS",
    price: "490€",
    badge: "One shot",
    description:
      "Un SaaS clé en main pour tester une idée rapidement, sans te perdre dans la technique.",
    features: [
      "1 template SaaS clé en main",
      "Design moderne & responsive",
      "Intégration de base (auth, paiement, dashboard)",
      "Livraison en quelques jours",
      "Documentation de prise en main",
    ],
    ctaLabel: "Lancer mon 1er SaaS",
  },
  {
    name: "Growth",
    highlight: "Pour créateurs & freelances",
    price: "990€",
    badge: "Populaire",
    featured: true,
    description:
      "Idéal si tu veux un SaaS sérieux à exploiter ou revendre à tes clients.",
    features: [
      "Tout le plan Starter",
      "Personnalisation de la marque (logo, couleurs, wording)",
      "Pages marketing incluses (landing, pricing, FAQ)",
      "Système d’abonnements (Stripe) prêt",
      "Support prioritaire à la mise en ligne",
    ],
    ctaLabel: "Créer un SaaS rentable",
  },
  {
    name: "Custom",
    highlight: "Pour agences & entreprises",
    price: "Sur devis",
    badge: "Sur mesure",
    description: "Un SaaS pensé pour ton business, tes process et tes équipes.",
    features: [
      "Audit rapide de ton besoin",
      "Spécifications fonctionnelles sur mesure",
      "Architecture SaaS scalable",
      "Intégrations spécifiques (CRM, outils internes, etc.)",
      "Accompagnement au déploiement",
    ],
    ctaLabel: "Parler à un expert",
    ctaHref: "/contact",
  },
];

export default function PricingClient() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050B1A] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -right-40 -top-56 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.65)_70%)]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 lg:px-8 lg:pt-20">
        <PricingHero />
        <PricingPlans plans={PLANS} />
        <PricingReassurance />
      </main>
    </div>
  );
}

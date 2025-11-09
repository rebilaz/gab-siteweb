"use client";

import React from "react";

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "On a enfin un tableau de bord unique pour le chiffre d’affaires, les leads et le pipe. Toute l’équipe regarde les mêmes chiffres et on repère les blocages en quelques minutes.",
    name: "Julie Martin",
    role: "CEO, Studio Nova",
  },
  {
    text: "Les relances, exports et mises à jour CRM sont automatisés. On a supprimé une grosse partie du travail manuel et des erreurs Excel. Je peux me concentrer sur la stratégie, pas sur l’opérationnel.",
    name: "Thomas Leroy",
    role: "Responsable opérations, Bold SaaS",
  },
  {
    text: "Nos outils parlent enfin entre eux : formulaires, CRM, facturation, suivi projets… Les automatisations tournent en arrière-plan et je reçois juste les alertes quand quelque chose bloque.",
    name: "Sarah Dupont",
    role: "Fondatrice, Maison Sélène",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
      {/* halo de fond */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25)_0,_transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header minimal */}
        <div className="mx-auto mb-10 text-center">
          <span className="inline-flex items-center rounded-full border border-sky-500/40 bg-sky-900/30 px-3 py-1 text-xs font-medium uppercase tracking-wide text-sky-300">
            Systèmes & automatisations
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
            Ce que disent mes clients
          </h2>
        </div>

        {/* Grid de témoignages */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="group flex h-full flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.55)] backdrop-blur-md transition duration-200 hover:-translate-y-1.5 hover:border-sky-500/60 hover:shadow-[0_22px_60px_rgba(8,47,73,0.9)]"
            >
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-slate-100">
                  <span className="mr-1 text-sky-400/80">“</span>
                  {t.text}
                  <span className="ml-1 text-sky-400/80">”</span>
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                {/* Avatar initiales */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-sm font-semibold text-sky-300 ring-1 ring-sky-400/50">
                  {t.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-50">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

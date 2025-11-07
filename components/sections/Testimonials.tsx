import React from "react";

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "On a enfin une vision claire de nos performances. En 2 semaines, on a optimisé nos campagnes et baissé notre CPA de 32%.",
    name: "Julie Martin",
    role: "CMO, Studio Nova",
  },
  {
    text: "Le reporting automatique nous fait gagner plusieurs heures par semaine. On peut se concentrer sur la stratégie, pas sur les exports.",
    name: "Thomas Leroy",
    role: "Growth Marketer, Bold SaaS",
  },
  {
    text: "On a tout centralisé : Facebook Ads, Google Sheets et notre CRM. C’est devenu notre hub data pour piloter l’acquisition.",
    name: "Sarah Dupont",
    role: "Fondatrice, Maison Sélène",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="temoignages"
      className="relative overflow-hidden bg-slate-950 py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* halo de fond */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.20)_0,_transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium uppercase tracking-wide text-sky-300 ring-1 ring-sky-500/30">
            Social Ads & Data
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
            Ce que disent nos clients
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Des équipes marketing qui pilotent leurs campagnes avec une
            vision claire, sans Excel infernal ni exports à rallonge.
          </p>
        </div>

        {/* Grid de témoignages */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="group flex h-full flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.55)] backdrop-blur-md transition duration-200 hover:-translate-y-1.5 hover:border-sky-500/60 hover:shadow-[0_22px_60px_rgba(8,47,73,0.9)]"
            >
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-1 text-xs text-amber-300">
                  <span>★★★★★</span>
                  <span className="ml-1 text-[11px] text-amber-200/80">
                    Avis vérifié
                  </span>
                </div>
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
                  <p className="text-sm font-medium text-slate-50">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* petite note en dessous */}
        <p className="mt-8 text-center text-xs text-slate-500">
          Ces résultats dépendent évidemment de vos créas, de vos offres et de
          votre budget média — notre rôle est de vous donner la meilleure
          lecture possible de vos performances.
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;

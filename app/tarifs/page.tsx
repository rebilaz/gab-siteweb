// app/tarifs/page.tsx

import Link from "next/link";

const plans = [
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
      "Accès à la documentation de prise en main",
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
      "Intégration d’un système d’abonnements",
      "Support prioritaire à la mise en ligne",
    ],
    ctaLabel: "Créer un SaaS rentable",
  },
  {
    name: "Custom",
    highlight: "Pour agences & entreprises",
    price: "Sur devis",
    badge: "Sur mesure",
    description:
      "Un SaaS pensé pour ton business, tes process et tes équipes.",
    features: [
      "Audit rapide de ton besoin",
      "Spécifications fonctionnelles sur mesure",
      "Architecture SaaS scalable",
      "Intégrations spécifiques (CRM, outils internes, etc.)",
      "Accompagnement au déploiement",
    ],
    ctaLabel: "Parler à un expert",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10 lg:px-8 lg:pt-16">
        {/* Intro */}
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Tarifs pour lancer ton SaaS clé en main
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Tu choisis le niveau d&apos;accompagnement, on s&apos;occupe du
            reste : de l&apos;idée au SaaS prêt à être vendu.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Pas d&apos;engagement caché. Chaque projet est livré avec son code
            source et une documentation claire.
          </p>
        </section>

        {/* Plans */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={[
                "flex flex-col rounded-2xl border bg-white/80 p-5 shadow-sm",
                plan.featured
                  ? "border-indigo-500/70 shadow-[0_18px_45px_rgba(15,23,42,0.16)]"
                  : "border-slate-200/70",
              ].join(" ")}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-slate-900">
                  {plan.name}
                </h2>
                <span
                  className={[
                    "rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]",
                    plan.featured
                      ? "bg-indigo-50 text-indigo-700"
                      : "bg-slate-100 text-slate-500",
                  ].join(" ")}
                >
                  {plan.badge}
                </span>
              </div>

              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                {plan.highlight}
              </p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-slate-900">
                  {plan.price}
                </span>
                {plan.price !== "Sur devis" && (
                  <span className="text-xs text-slate-500">
                    / projet, code inclus
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                {plan.description}
              </p>

              <ul className="mt-4 flex flex-1 flex-col gap-2 text-xs text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-[3px] h-[6px] w-[6px] rounded-full bg-indigo-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                {plan.name === "Custom" ? (
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-slate-900 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
                  >
                    {plan.ctaLabel}
                  </Link>
                ) : (
                  <button
                    className={[
                      "inline-flex w-full items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold shadow-sm transition",
                      plan.featured
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "bg-slate-900 text-white hover:bg-slate-800",
                    ].join(" ")}
                  >
                    {plan.ctaLabel}
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Petit bloc réassurance */}
        <section className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-5 text-xs text-slate-600">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Comment ça se passe concrètement ?
          </h2>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold text-slate-800">
                1. On choisit ensemble le bon template
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Tu nous expliques ton idée, on te propose le type de SaaS le
                plus adapté (IA, automation, SEO, etc.).
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-800">
                2. On personnalise ton SaaS
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Branding, wording, pages marketing, intégrations : on ajuste
                pour que ce soit vraiment ton produit.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-800">
                3. Tu peux vendre
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Une fois livré, ton SaaS est prêt à être utilisé ou revendu à
                tes clients. Tu gardes le contrôle.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// app/templates/page.tsx

import Link from "next/link";

type Template = {
  category: string;
  label: string;
  slug: string;
  punchline: string;
  tags: string[];
};

const templates: Template[] = [
  {
    category: "SaaS IA",
    label: "Générateur de contenu IA",
    slug: "generateur-contenu-ia",
    punchline: "Crée des textes (posts, emails, articles) automatiquement.",
    tags: ["IA", "Créateurs de contenu", "Abonnements"],
  },
  {
    category: "SaaS IA",
    label: "Chatbot IA marque blanche",
    slug: "chatbot-ia-marque-blanche",
    punchline: "Un chatbot que tes clients peuvent brander à leur nom.",
    tags: ["Agences", "Widget site web", "Multi-clients"],
  },
  {
    category: "Automation",
    label: "Automation LinkedIn",
    slug: "automation-linkedin",
    punchline: "Automatise la prospection et le suivi sur LinkedIn.",
    tags: ["Growth", "Lead gen", "Sequences"],
  },
  {
    category: "Automation",
    label: "Monitoring & alertes",
    slug: "monitoring-alertes",
    punchline: "Surveille des sites / prix / stats et envoie des alertes.",
    tags: ["MRR simple", "Cron jobs", "Email / Slack"],
  },
  {
    category: "SEO",
    label: "Audit SEO automatique",
    slug: "audit-seo-automatique",
    punchline: "Analyse un site et génère un rapport SEO prêt à envoyer.",
    tags: ["Agences SEO", "Rapport PDF", "White-label"],
  },
  {
    category: "Marketing",
    label: "Générateur de landing pages",
    slug: "generateur-landing-pages",
    punchline: "Crée des pages de vente à partir d’une simple offre.",
    tags: ["Créateurs d’offres", "Pages sales", "A/B testing"],
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10 lg:px-8 lg:pt-16">
        {/* Intro très simple */}
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Choisis ton template de SaaS clé en main
          </h1>
          <p className="mt-4 text-sm text-slate-600">
            Tu sélectionnes un modèle. On le personnalise à ta marque et tu peux
            commencer à vendre.
          </p>
        </section>

        {/* Grille de templates, simple & lisible */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {templates.map((tpl) => (
            <article
              key={tpl.slug}
              className="flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm transition hover:-translate-y-[2px] hover:shadow-md"
            >
              <span className="text-[11px] font-medium text-indigo-500">
                {tpl.category}
              </span>
              <h2 className="mt-1 text-sm font-semibold text-slate-900">
                {tpl.label}
              </h2>
              <p className="mt-2 text-xs text-slate-600">{tpl.punchline}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {tpl.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <Link
                  href={`/templates/${tpl.slug}`}
                  className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Voir le template →
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.97]"
                >
                  Parler de ce template
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Petit bloc final, très court */}
        <section className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-xs text-slate-600">
          <p>
            Tu hésites entre plusieurs idées ? On peut t’aider à choisir le
            template le plus simple à lancer pour toi.
          </p>
          <div className="mt-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-[11px] font-semibold text-white shadow-[0_16px_40px_rgba(88,80,236,0.5)] transition hover:brightness-110"
            >
              Parler de ton projet →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

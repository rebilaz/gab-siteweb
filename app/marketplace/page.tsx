// app/marketplace/page.tsx
import Image from "next/image";
import Link from "next/link";

type Stage = "Idea" | "MVP" | "Live";
type Pricing = "Free" | "Paid";

type Listing = {
  slug: string;
  title: string;
  description: string;
  image: string; // path in /public
  stage: Stage;
  pricing: Pricing;
  tags: string[];
};

const LISTINGS: Listing[] = [
  {
    slug: "vexly-mvp-preview",
    title: "MVP Preview",
    description: "Un aperçu cliquable de ton SaaS (landing, auth, dashboard) pour valider vite.",
    image: "/marketplace/vexly-mvp-preview.png",
    stage: "MVP",
    pricing: "Paid",
    tags: ["SaaS", "MVP", "Preview"],
  },
  {
    slug: "clientops-hub",
    title: "ClientOps Hub",
    description: "Portail client + onboarding + suivi de livrables. Parfait pour freelances & agences.",
    image: "/marketplace/clientops-hub.png",
    stage: "Idea",
    pricing: "Free",
    tags: ["Freelance", "Portal", "Ops"],
  },
  {
    slug: "creator-billing-lite",
    title: "Creator Billing Lite",
    description: "Billing simple pour créateurs : abonnements, liens de paiement, stats MRR.",
    image: "/marketplace/creator-billing-lite.png",
    stage: "Live",
    pricing: "Paid",
    tags: ["Stripe", "MRR", "Creator"],
  },
  {
    slug: "brief-to-saas",
    title: "Brief to SaaS",
    description: "Transforme un brief en scope MVP clair : écrans, features, priorités.",
    image: "/marketplace/brief-to-saas.png",
    stage: "MVP",
    pricing: "Paid",
    tags: ["Scope", "MVP", "Product"],
  },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-700">
      {children}
    </span>
  );
}

function Pill({ tone, children }: { tone: "dark" | "soft"; children: React.ReactNode }) {
  return (
    <span
      className={
        tone === "dark"
          ? "inline-flex items-center rounded-full bg-slate-900 px-2.5 py-1 text-[11px] text-white"
          : "inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700"
      }
    >
      {children}
    </span>
  );
}

export const metadata = {
  title: "Marketplace – Vexly",
  description: "Découvrez des SaaS et modules prêts à lancer : MVP, templates, produits.",
  alternates: { canonical: "/marketplace" },
};

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Marketplace
            </h1>
            <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600">
              Des SaaS, MVP et briques produit prêts à lancer. Clair, premium, orienté exécution.
            </p>

            {/* Search (UI only pour l’instant) */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                placeholder="Rechercher un SaaS, une niche, un module…"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[13px] text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-slate-300"
              />
              <div className="flex gap-2">
                <select className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-[13px] text-slate-700 shadow-sm outline-none focus:border-slate-300">
                  <option>Tous les stages</option>
                  <option>Idea</option>
                  <option>MVP</option>
                  <option>Live</option>
                </select>
                <select className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-[13px] text-slate-700 shadow-sm outline-none focus:border-slate-300">
                  <option>Free & Paid</option>
                  <option>Free</option>
                  <option>Paid</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[16px] font-semibold text-slate-900">Tous les produits</h2>
            <p className="mt-1 text-[13px] text-slate-500">
              Chaque carte ouvre une page détail (comme un article).
            </p>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Badge>Templates</Badge>
            <Badge>MVP</Badge>
            <Badge>Modules</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LISTINGS.map((item) => (
            <Link
              key={item.slug}
              href={`/marketplace/${item.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl border-b border-slate-200 bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority={false}
                />
              </div>

              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone="soft">{item.stage}</Pill>
                  <Pill tone={item.pricing === "Paid" ? "dark" : "soft"}>{item.pricing}</Pill>
                </div>

                <h3 className="mt-3 text-[15px] font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-600">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[12px] font-medium text-slate-700">
                    Voir le détail →
                  </span>
                  <span className="text-[12px] text-slate-400">
                    /marketplace/{item.slug}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

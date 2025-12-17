"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, LayoutTemplate, Box, Zap } from "lucide-react";

type CategoryTab = "All" | "Templates" | "MVP" | "Modules";
type Category = "Templates" | "MVP" | "Modules";

type ClientListing = {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  stack: string[];
  featured?: boolean;
  category: Category;
  niche_category?: string;
  discovered_at?: string | null;
};

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 ${className}`}
    >
      {children}
    </span>
  );
}

function iconForCategory(category: Category) {
  if (category === "Templates") return <LayoutTemplate size={12} />;
  if (category === "Modules") return <Box size={12} />;
  return <Zap size={12} />;
}

export default function MarketplaceClient({ listings }: { listings: ClientListing[] }) {
  const [activeTab, setActiveTab] = useState<CategoryTab>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredItem = listings.find((i) => i.featured);

  const filteredListings = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return listings.filter((item) => {
      if (activeTab === "All" && item.featured && q === "") return false;

      const matchesTab = activeTab === "All" || item.category === activeTab;

      const matchesSearch =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.stack.some((s) => s.toLowerCase().includes(q)) ||
        (item.niche_category ?? "").toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [listings, activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="border-b border-slate-100 bg-white pt-8 pb-6">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Marketplace</h1>
          <p className="mt-2 text-sm text-slate-500">
            Découvrez des SaaS listés automatiquement (SEO-first).
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-8">
        {featuredItem && searchQuery === "" && activeTab === "All" && (
          <section className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/50 p-1 shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="relative h-64 w-full overflow-hidden rounded-2xl md:h-auto md:w-3/5 bg-slate-100">
                {featuredItem.image ? (
                  <Image
                    src={featuredItem.image}
                    alt={featuredItem.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                    Aperçu indisponible
                  </div>
                )}

                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm text-slate-800 shadow-sm">
                  ★ Featured
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 md:p-8 md:w-2/5">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100">Recommended</Badge>
                  <Badge>{featuredItem.category}</Badge>
                  {featuredItem.niche_category && <Badge>{featuredItem.niche_category}</Badge>}
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{featuredItem.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{featuredItem.description}</p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500">
                  {featuredItem.stack.slice(0, 6).map((tech) => (
                    <span key={tech} className="rounded border border-slate-200 bg-white px-2 py-1">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <Link
                    href={`/marketplace/${featuredItem.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Découvrir <ArrowRight size={16} />
                  </Link>
                  <span className="text-xs font-mono text-slate-500">{featuredItem.slug}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="sticky top-[65px] z-30 mb-8 bg-white/95 py-4 backdrop-blur-md">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="relative w-full md:w-96">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="Rechercher (nom, niche, stack, slug...)"
              />
            </div>

            <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              {(["All", "Templates", "MVP", "Modules"] as CategoryTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                    activeTab === tab ? "bg-slate-900 text-white" : "bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-medium text-slate-900">
            {searchQuery ? `Résultats pour "${searchQuery}"` : "Tous les produits"}
          </div>
          <div className="text-xs text-slate-500">
            {filteredListings.length} résultat{filteredListings.length > 1 ? "s" : ""}
          </div>
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((item) => (
              <Link
                key={item.slug}
                href={`/marketplace/${item.slug}`}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-slate-100 border-b border-slate-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                      Aperçu indisponible
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-lg">
                      Voir le détail
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      {iconForCategory(item.category)}
                      {item.category}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{item.slug}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.niche_category && <Badge>{item.niche_category}</Badge>}
                    {item.tags.slice(0, 2).map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {item.stack.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium text-slate-500 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                      {item.stack.length > 3 && (
                        <span className="text-[10px] font-medium text-slate-400 py-0.5">
                          + {item.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-20 text-center bg-slate-50/50">
            <div className="mb-4 rounded-full bg-white p-4 shadow-sm">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">Aucun produit trouvé</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-1 text-sm">
              Essayez un autre terme ou changez de catégorie.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("All");
              }}
              className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Tout effacer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

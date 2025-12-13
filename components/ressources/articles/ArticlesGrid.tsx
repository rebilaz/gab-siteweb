"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Search, ArrowRight } from "lucide-react";
import type { EnrichedArticle, UiCluster } from "./ArticlesIndexClient";

function formatDateFr(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return value;
  }
}

function ArticleCard({ article }: { article: EnrichedArticle }) {
  const fm = article.frontmatter as any;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Link href={`/articles/${article.slug}`} className="group block h-full">
        <div className="h-full bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-[11px] uppercase tracking-wide border border-slate-200">
              {article._clusterLabel}
            </span>
          </div>

          <h3 className="text-slate-900 text-base sm:text-lg font-semibold leading-snug group-hover:text-indigo-600 transition-colors">
            {fm.title}
          </h3>

          {fm.description && (
            <p className="mt-2 text-slate-600 text-sm leading-relaxed line-clamp-3 flex-1">
              {fm.description}
            </p>
          )}

          <div className="mt-5 pt-4 border-t border-slate-100 text-slate-500 text-xs sm:text-sm flex items-center gap-3">
            {fm.date && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {formatDateFr(fm.date)}
              </span>
            )}
            {fm.readingTime && <span>{fm.readingTime}</span>}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function LatestArticle({ article }: { article: EnrichedArticle }) {
  const fm = article.frontmatter as any;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-10 lg:mb-12"
    >
      <Link
        href={`/articles/${article.slug}`}
        className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-7 sm:p-8 lg:p-10 shadow-2xl shadow-slate-900/20 hover:shadow-3xl transition-all duration-500"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(99,102,241,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.12),transparent_60%)]" />

        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm uppercase tracking-wide border border-white/15">
              Dernier article
            </span>

            <span className="px-3.5 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-xs sm:text-sm border border-white/15">
              {article._clusterLabel}
            </span>

            {Array.isArray(fm.tags) &&
              fm.tags.slice(0, 2).map((tag: string) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 bg-white/10 backdrop-blur-sm text-white/80 rounded-full text-xs sm:text-sm border border-white/10"
                >
                  {tag}
                </span>
              ))}
          </div>

          <h2 className="text-white text-2xl sm:text-3xl font-semibold mb-4 leading-tight group-hover:text-indigo-200 transition-colors duration-300">
            {fm.title}
          </h2>

          {fm.description && (
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 max-w-3xl">
              {fm.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm sm:text-base">
            {fm.date && (
              <span className="flex items-center gap-2">
                <Clock className="w-4.5 h-4.5" />
                <span>{formatDateFr(fm.date)}</span>
              </span>
            )}
            {fm.readingTime && <span>{fm.readingTime} de lecture</span>}

            <span className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm group-hover:bg-white/20 transition-colors duration-300">
              Lire <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

type Props = {
  selectedCluster: string;
  clusters: UiCluster[];
  articles: EnrichedArticle[];
  onSelectCluster: (id: string) => void;
};

export default function ArticlesGrid({
  selectedCluster,
  clusters,
  articles,
  onSelectCluster,
}: Props) {
  // bloc “dernier article” = le plus récent (articles est déjà trié desc)
  const latest = articles[0];

  // group by cluster si on est sur "all"
  const grouped = React.useMemo(() => {
    const map = new Map<string, { label: string; items: EnrichedArticle[] }>();
    for (const a of articles) {
      const key = a._clusterId;
      if (!map.has(key)) map.set(key, { label: a._clusterLabel, items: [] });
      map.get(key)!.items.push(a);
    }
    return Array.from(map.entries())
      .map(([id, v]) => ({ id, label: v.label, items: v.items }))
      .sort((a, b) => b.items.length - a.items.length);
  }, [articles]);

  return (
    <main className="mx-auto max-w-7xl px-6 lg:px-8 py-10 lg:py-12 flex-1">
      <AnimatePresence mode="wait">
        {articles.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex flex-col items-center justify-center py-20 px-6"
          >
            <div className="p-6 bg-slate-100 rounded-full mb-5">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-slate-900 text-xl mb-2">Aucun résultat</h3>
            <p className="text-slate-600 text-center max-w-md">
              Change les mots-clés ou sélectionne une autre catégorie.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={selectedCluster}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* ✅ Dernier article (seulement quand on a au moins 1 article) */}
            {latest && <LatestArticle article={latest} />}

            {/* MODE "all" => sections */}
            {selectedCluster === "all" ? (
              <div className="space-y-14">
                {grouped.map((section) => {
                  // évite de re-afficher le latest dans la première section
                  const withoutLatest = section.items.filter((a) => a.slug !== latest.slug);

                  return (
                    <section key={section.id}>
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <div>
                          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                            {section.label}
                          </h2>
                          <p className="text-slate-600 text-sm mt-1">
                            {section.items.length} article{section.items.length > 1 ? "s" : ""}
                          </p>
                        </div>

                        <button
                          onClick={() => onSelectCluster(section.id)}
                          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Voir tout →
                        </button>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {withoutLatest.slice(0, 6).map((a) => (
                          <ArticleCard key={a.slug} article={a} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              // MODE catégorie
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                    {clusters.find((c) => c.id === selectedCluster)?.label ?? "Catégorie"}
                  </h2>
                  <p className="text-slate-600 mt-2">
                    {articles.length} article{articles.length > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {articles
                    .filter((a) => a.slug !== latest.slug)
                    .map((a) => (
                      <ArticleCard key={a.slug} article={a} />
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

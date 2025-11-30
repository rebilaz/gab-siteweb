"use client";

import React from "react";
import Link from "next/link";
import type { Article } from "@/lib/articles";

type Props = {
  articles: Article[];
};

const ArticlesIndexClient: React.FC<Props> = ({ articles }) => {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    if (!query.trim()) return articles;

    const q = query.toLowerCase();

    return articles.filter(({ frontmatter }) => {
      const { title, description, niche, tags = [] } = frontmatter;

      const haystack = [
        title ?? "",
        description ?? "",
        niche ?? "",
        ...tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [articles, query]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-8 flex-1">
        {/* Titre + search */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Articles
            </h1>
            <p className="text-slate-600 mt-1 max-w-2xl">
              Conseils, stratégies et analyses autour des SaaS sur-mesure, de
              l’IA et de l’automatisation pour entreprises, créateurs et
              freelances.
            </p>

            <div className="mt-3 text-sm text-slate-500">
              {articles.length} article
              {articles.length > 1 ? "s" : ""}
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="w-full md:w-80">
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Rechercher un article
            </label>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mot-clé, niche, sujet..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm
                         shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Filtre par titre, description, niche ou tags.
            </p>
          </div>
        </header>

        {/* Résultats */}
        {filtered.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucun article ne correspond à votre recherche.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map(({ frontmatter, slug }) => {
              const {
                title,
                description,
                date,
                readingTime,
                niche,
                tags = [],
              } = frontmatter;

              return (
                <Link
                  key={slug}
                  href={`/articles/${slug}`}
                  className="group block rounded-2xl border border-slate-200 bg-white/90 p-5
                             shadow-sm shadow-slate-100 transition hover:-translate-y-1
                             hover:border-indigo-200 hover:shadow-md"
                >
                  {/* Niche + tags */}
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px]">
                    {niche && (
                      <span className="rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 font-semibold uppercase tracking-[0.12em]">
                        {niche}
                      </span>
                    )}
                    {tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-2 py-1 text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Titre */}
                  <h2 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
                    {title}
                  </h2>

                  {/* Description */}
                  {description && (
                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                      {description}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    {date && <span>{date}</span>}
                    {date && readingTime && (
                      <span className="text-slate-300">•</span>
                    )}
                    {readingTime && <span>{readingTime}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ArticlesIndexClient;

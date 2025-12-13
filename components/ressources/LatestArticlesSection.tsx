"use client";

import Link from "next/link";
import type { Article } from "@/lib/articles";

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function LatestArticlesSection({ latestArticles }: { latestArticles: Article[] }) {
  return (
    <section className="mt-24">
      <header className="mb-8 flex items-end justify-between border-b pb-4">
        <div>
          <h3 className="text-lg font-bold">Fraîchement publiés</h3>
          <p className="text-sm text-slate-500">Derniers articles</p>
        </div>
        <Link href="/articles" className="text-xs font-semibold text-indigo-600">
          Tout voir →
        </Link>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {latestArticles.slice(0, 4).map((a) => (
          <Link
            key={a.slug}
            href={`/articles/${a.slug}`}
            className="rounded-2xl border bg-white p-5 hover:shadow-md"
          >
            <time className="text-[11px] text-slate-400">
              {formatDate(a.frontmatter.date)}
            </time>
            <h4 className="mt-2 font-bold">{a.frontmatter.title}</h4>
            {a.frontmatter.description && (
              <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                {a.frontmatter.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

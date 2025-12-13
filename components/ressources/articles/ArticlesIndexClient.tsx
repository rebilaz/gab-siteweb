"use client";

import React from "react";
import ArticlesHero from "./ArticlesHero";
import ClusterBar from "./ClusterBar";
import ArticlesGrid from "./ArticlesGrid";
import type { Article } from "@/lib/articles";

export type EnrichedArticle = Article & {
  _clusterId: string;
  _clusterLabel: string;
};

export type UiCluster = {
  id: string;
  label: string;
  count: number;
};

function toDisplayLabel(raw: string) {
  const s = (raw || "").trim();
  if (!s) return "Autres";

  const map: Record<string, string> = {
    ai: "Intelligence Artificielle",
    ia: "Intelligence Artificielle",
    automation: "Automatisation",
    automatisation: "Automatisation",
    freelance: "Freelance",
    design: "Design / UX",
    business: "Business / Pricing",
    pricing: "Business / Pricing",
    saas: "SaaS",
  };

  const key = s.toLowerCase();
  return map[key] ?? s.charAt(0).toUpperCase() + s.slice(1);
}

function normalizeId(raw: string) {
  return (raw || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "autres";
}

function getArticleClusterRaw(fm: any) {
  return fm?.cluster || fm?.niche || "Autres";
}

function enrichArticles(articles: Article[]): EnrichedArticle[] {
  return articles.map((article) => {
    const fm = article.frontmatter as any;
    const raw = getArticleClusterRaw(fm);
    return {
      ...article,
      _clusterId: normalizeId(String(raw)),
      _clusterLabel: toDisplayLabel(String(raw)),
    };
  });
}

function buildClusters(list: EnrichedArticle[]): UiCluster[] {
  const map = new Map<string, UiCluster>();
  for (const a of list) {
    const existing = map.get(a._clusterId);
    if (existing) existing.count += 1;
    else map.set(a._clusterId, { id: a._clusterId, label: a._clusterLabel, count: 1 });
  }
  return Array.from(map.values()).sort((a, b) =>
    a.label.localeCompare(b.label, "fr", { sensitivity: "base" }),
  );
}

function sortByDateDesc(list: EnrichedArticle[]) {
  return [...list].sort((a, b) => {
    const da = a.frontmatter?.date ? new Date(a.frontmatter.date as string).getTime() : 0;
    const db = b.frontmatter?.date ? new Date(b.frontmatter.date as string).getTime() : 0;
    return db - da;
  });
}

type Props = { articles: Article[] };

export default function ArticlesIndexClient({ articles }: Props) {
  const [selectedCluster, setSelectedCluster] = React.useState<string>("all");
  const [query, setQuery] = React.useState("");

  const enriched = React.useMemo(() => enrichArticles(articles), [articles]);
  const clusters = React.useMemo(() => buildClusters(enriched), [enriched]);

  const searched = React.useMemo(() => {
    let list = enriched;

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(({ frontmatter }) => {
        const { title, description, niche, cluster, tags = [] } = frontmatter as any;
        const haystack = [title ?? "", description ?? "", niche ?? "", cluster ?? "", ...tags]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    return sortByDateDesc(list);
  }, [enriched, query]);

  const filtered = React.useMemo(() => {
    if (selectedCluster === "all") return searched;
    return searched.filter((a) => a._clusterId === selectedCluster);
  }, [searched, selectedCluster]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ArticlesHero total={articles.length} query={query} onQueryChange={setQuery} />

      <ClusterBar
        clusters={clusters}
        selected={selectedCluster}
        onSelect={setSelectedCluster}
      />

      <ArticlesGrid
        selectedCluster={selectedCluster}
        clusters={clusters}
        articles={filtered}
        onSelectCluster={setSelectedCluster}
      />

      <div className="h-10" />
    </div>
  );
}

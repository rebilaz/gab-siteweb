import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import RessourcesClient from "@/components/ressources/RessourcesClient";

export const metadata: Metadata = {
  title: "Ressources – Vexly",
  description: "Articles et parcours guidés pour construire et monétiser ton projet SaaS.",
  alternates: { canonical: "https://www.vexly.fr/ressources" },
};

export default async function RessourcesPage() {
  const articles = await getAllArticles();

  // ✅ Derniers articles (triés par date si ton getAllArticles ne le fait pas déjà)
  const latest = [...articles]
    .sort((a, b) => {
      const da = new Date(a.frontmatter.date).getTime();
      const db = new Date(b.frontmatter.date).getTime();
      return db - da;
    })
    .slice(0, 6);

  return <RessourcesClient latestArticles={latest} />;
}

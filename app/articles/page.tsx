import { getAllArticles } from "@/lib/articles";
import ArticlesIndexClient from "@/components/articles/ArticlesIndexClient";

export const revalidate = 1800;

export const metadata = {
  title: "Articles – Vexly",
  description: "Tous les articles SaaS, automatisation, IA et business.",
  alternates: {
    canonical: "https://www.vexly.fr/articles",
  },
};

export default async function ArticlesIndexPage() {
  const articles = await getAllArticles();
  return <ArticlesIndexClient articles={articles} />;
}

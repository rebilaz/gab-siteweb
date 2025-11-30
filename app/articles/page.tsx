import { getAllArticles } from "@/lib/articles";
import ArticlesIndexClient from "@/components/articles/ArticlesIndexClient";

export const revalidate = 1800; // revalidation toutes les 30 min

export default async function ArticlesIndexPage() {
  const articles = await getAllArticles();

  return <ArticlesIndexClient articles={articles} />;
}

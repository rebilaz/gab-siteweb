import type { Metadata } from "next";
import { ArticleLayout } from "@/components/articles/ArticleLayout";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";

type Params = { slug: string };

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return { title: "Article introuvable" };

  const { frontmatter } = article;

  // ✅ Canonical: frontmatter si tu veux (absolue), sinon fallback propre
  const canonical =
    (frontmatter.canonical_url && frontmatter.canonical_url.trim()) ||
    `/articles/${slug}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: {
      canonical, // ✅ LA BALISE CANONICAL SERA GÉNÉRÉE
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      url:
        typeof canonical === "string" && canonical.startsWith("http")
          ? canonical
          : `https://www.vexly.fr${canonical}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return <div>Article introuvable</div>;

  const { frontmatter, sections } = article;

  return (
    <ArticleLayout
      title={frontmatter.title}
      subtitle={frontmatter.subtitle}
      date={frontmatter.date}
      readingTime={frontmatter.readingTime}
      tags={frontmatter.tags}
      niche={frontmatter.niche}
      coverImageUrl={frontmatter.coverImageUrl}
      backHref="/articles"
      sections={sections}
    />
  );
}
